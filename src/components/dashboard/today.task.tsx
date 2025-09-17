"use client";

import { useTask } from '@/lib/contexts/TaskContext';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function TodayTask() {
    const { getTodayTasks } = useTask();
    const todayTasks = getTodayTasks();

    // Chuyển đổi tasks thành schedule items
    const scheduleItems = todayTasks
        .filter(task => task.startTime && task.endTime) // Chỉ lấy tasks có thời gian cụ thể
        .map(task => {
            // Tính duration từ startTime và endTime
            const startTime = task.startTime!.split(':');
            const endTime = task.endTime!.split(':');
            const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
            const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
            const durationMinutes = endMinutes - startMinutes;
            const durationHours = Math.floor(durationMinutes / 60);
            const remainingMinutes = durationMinutes % 60;
            const duration = durationHours > 0
                ? `${durationHours}h${remainingMinutes > 0 ? ` ${remainingMinutes}m` : ''}`
                : `${remainingMinutes}m`;

            return {
                time: task.startTime!,
                title: task.title,
                type: 'task',
                duration: duration,
                priority: task.priority,
                completed: task.status === 'completed',
                id: task.id
            };
        })
        .sort((a, b) => a.time.localeCompare(b.time)); // Sắp xếp theo thời gian

    const getItemColor = (priority?: string, completed?: boolean) => {
        if (completed) {
            return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-700';
        }

        if (priority === 'high') return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-700';
        if (priority === 'medium') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-700';
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-700';
    };

    const getItemIcon = (completed?: boolean) => {
        if (completed) return <CheckCircle2 className="h-3 w-3" />;
        return <AlertCircle className="h-3 w-3" />;
    };

    return (
        <div className="space-y-4">
            {scheduleItems.map((item, index) => (
                <div key={item.id || index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {item.time}
                    </div>
                    <div className="flex-1">
                        <div className={`px-3 py-2 rounded-lg border ${getItemColor(item.priority, item.completed)}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {getItemIcon(item.completed)}
                                    <span className={`font-medium text-sm ${item.completed ? 'line-through opacity-75' : ''}`}>
                                        {item.title}
                                    </span>
                                    {item.completed && (
                                        <Badge variant="secondary" className="text-xs">
                                            Hoàn thành
                                        </Badge>
                                    )}
                                </div>
                                <span className="text-xs opacity-75">{item.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {scheduleItems.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Không có lịch trình nào cho hôm nay</p>
                    <p className="text-sm mt-2">Hãy thêm nhiệm vụ với thời gian cụ thể để xem lịch trình</p>
                </div>
            )}
        </div>
    );
}