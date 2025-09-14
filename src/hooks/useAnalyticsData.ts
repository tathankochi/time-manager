"use client";

import { useTask } from '@/lib/contexts/TaskContext';

export function useAnalyticsData() {
    const {
        tasks,
        calculateProductivityScore,
        getCompletedTasksCount,
        getTodayTasks,
        getPomodoroStats,
        pomodoroSessions
    } = useTask();

    // Đảm bảo tasks luôn là array
    const safeTasks = tasks || [];
    const safePomodoroSessions = pomodoroSessions || [];

    // Tính toán các metrics cơ bản
    const productivityScore = calculateProductivityScore();
    const todayTasks = getTodayTasks();
    const pomodoroStats = getPomodoroStats();
    const completedFocusSessions = safePomodoroSessions.filter(session => session.type === 'focus');

    // Lấy số nhiệm vụ đã hoàn thành trong 7 ngày qua (theo logic dashboard)
    const oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    const completedTasks = safeTasks.filter(task =>
        task.completed &&
        task.updatedAt >= oneWeekAgo
    ).length;

    // Tính tổng tasks
    const totalTasks = safeTasks.length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Tính xu hướng
    const trend = productivityScore >= 85 ? 'tăng' : productivityScore >= 60 ? 'ổn định' : 'giảm';

    // Tạo dữ liệu phân bố theo category (4 loại cố định)
    const predefinedCategories = ['Học tập', 'Phát triển bản thân', 'Giải trí', 'Gia đình'];

    const categoryData = predefinedCategories.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
    }, {} as Record<string, number>);

    // Đếm tasks cho từng category
    safeTasks.forEach(task => {
        if (task.category && predefinedCategories.includes(task.category)) {
            categoryData[task.category]++;
        }
    });

    const updatedCategoryData = Object.entries(categoryData)
        .map(([category, count]) => ({
            category,
            count,
            icon: getCategoryIcon(category)
        }))
        .sort((a, b) => b.count - a.count);

    // Tạo dữ liệu phân bố theo priority
    const priorityData = [
        { priority: 'high', label: 'Nhiệm vụ có độ ưu tiên cao', count: safeTasks.filter(task => task.priority === 'high').length, icon: 'AlertTriangle' },
        { priority: 'medium', label: 'Nhiệm vụ có độ ưu tiên trung bình', count: safeTasks.filter(task => task.priority === 'medium').length, icon: 'AlertCircle' },
        { priority: 'low', label: 'Nhiệm vụ có độ ưu tiên thấp', count: safeTasks.filter(task => task.priority === 'low').length, icon: 'Info' }
    ];

    // Tạo dữ liệu cho biểu đồ cột năng suất theo ngày
    const weeklyData = (() => {
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            // Lấy tasks của ngày đó
            const dayTasks = safeTasks.filter(task => {
                if (!task.deadline) return false;
                const taskDate = new Date(task.deadline).toDateString();
                return taskDate === date.toDateString();
            });

            // Tính năng suất cho ngày đó
            let productivity = 0;
            if (dayTasks.length > 0) {
                const completedTasks = dayTasks.filter(task => task.completed).length;
                const completionRate = (completedTasks / dayTasks.length) * 100;

                // Tính tỷ lệ hoàn thành tasks quan trọng
                const importantTasks = dayTasks.filter(task =>
                    task.priority === 'high' || task.priority === 'medium'
                );
                const completedImportantTasks = importantTasks.filter(task => task.completed).length;
                const importantCompletionRate = importantTasks.length > 0 ?
                    (completedImportantTasks / importantTasks.length) * 100 : 100;

                // Công thức tổng hợp
                productivity = Math.round((completionRate * 0.6) + (importantCompletionRate * 0.4));
            }

            // Format ngày tháng: T2, T3, T4, T5, T6, T7, CN
            const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
            const dayName = dayNames[date.getDay()];

            data.push({
                day: dayName,
                productivity: productivity
            });
        }

        return data;
    })();

    return {
        // Basic metrics
        tasks: safeTasks,
        productivityScore,
        completedTasks,
        todayTasks,
        pomodoroStats,
        completedFocusSessions,
        totalTasks,
        completionRate,
        trend,

        // Chart data
        weeklyData,
        updatedCategoryData,
        priorityData
    };
}

// Helper function để tạo icon cho category
function getCategoryIcon(category: string) {
    switch (category) {
        case 'Học tập':
            return 'BookOpen';
        case 'Phát triển bản thân':
            return 'User';
        case 'Giải trí':
            return 'Gamepad2';
        case 'Gia đình':
            return 'Heart';
        default:
            return 'BookOpen';
    }
}
