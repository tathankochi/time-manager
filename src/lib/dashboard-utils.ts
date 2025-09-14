/**
 * Dashboard utility functions for time calculations and formatting
 */

/**
 * Calculate total allocated time for tasks with start and end time
 */
export const calculateAllocatedTime = (tasks: any[]): number => {
    return tasks
        .filter(task => task.startTime && task.endTime)
        .reduce((total, task) => {
            const startTime = task.startTime!.split(':');
            const endTime = task.endTime!.split(':');
            const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
            const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
            const durationMinutes = endMinutes - startMinutes;
            return total + durationMinutes;
        }, 0);
};

/**
 * Format time from minutes to hours and minutes display
 */
export const formatAllocatedTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
};

/**
 * Format Vietnamese time with full date and time information
 */
export const formatVietnameseTime = (date: Date): string => {
    return date.toLocaleString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Get upcoming deadlines sorted by date
 */
export const getUpcomingDeadlines = (tasks: any[], limit: number = 3): any[] => {
    return tasks
        .filter(task => !task.completed && task.deadline)
        .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
        .slice(0, limit);
};

/**
 * Check if deadline is urgent (within 2 days)
 */
export const isDeadlineUrgent = (deadline: string): boolean => {
    const deadlineTime = new Date(deadline).getTime();
    const currentTime = new Date().getTime();
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;

    return deadlineTime - currentTime < twoDaysInMs;
};

/**
 * Calculate completion percentage for today's tasks
 */
export const calculateTodayCompletionRate = (todayTasks: any[]): {
    completed: number;
    total: number;
    percentage: number;
} => {
    const completed = todayTasks.filter(t => t.completed).length;
    const total = todayTasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
};

/**
 * Get productivity score description
 */
export const getProductivityDescription = (score: number): string => {
    if (score >= 80) return 'Xuất sắc!';
    if (score >= 60) return 'Tốt';
    return 'Cần cải thiện';
};

/**
 * Get productivity trend description
 */
export const getProductivityTrend = (score: number): string => {
    if (score >= 85) return 'tăng';
    if (score >= 60) return 'ổn định';
    return 'giảm';
};
