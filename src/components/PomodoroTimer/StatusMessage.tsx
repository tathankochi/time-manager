import { TimerType } from '@/types/pomodoro';
import { TIMER_LABELS } from '@/lib/pomodoro-utils';

interface StatusMessageProps {
    timerType: TimerType;
    isCompleted: boolean;
    isRunning: boolean;
}

export function StatusMessage({ timerType, isCompleted, isRunning }: StatusMessageProps) {
    if (isCompleted) {
        return (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <p className="text-green-800 dark:text-green-200 font-medium">
                    🎉 {TIMER_LABELS[timerType]} đã hoàn thành!
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                    {timerType === 'focus' ? 'Hãy nghỉ ngơi một chút!' : 'Sẵn sàng cho phiên tiếp theo!'}
                </p>
            </div>
        );
    }

    if (isRunning) {
        return (
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                    ⏰ {TIMER_LABELS[timerType]} đang chạy...
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                    {timerType === 'focus' ? 'Tập trung vào công việc!' : 'Thời gian nghỉ ngơi!'}
                </p>
            </div>
        );
    }

    return null;
}
