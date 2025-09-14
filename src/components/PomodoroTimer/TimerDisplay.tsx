import { Badge } from '@/components/ui/badge';
import { TimerType } from '@/types/pomodoro';
import {
    formatTime,
    getProgress,
    getTimerColorClasses,
    getProgressBarColorClasses,
    TIMER_CONFIG,
    TIMER_LABELS
} from '@/lib/pomodoro-utils';

interface TimerDisplayProps {
    timerType: TimerType;
    timeLeft: number;
    isCompleted: boolean;
}

export function TimerDisplay({ timerType, timeLeft, isCompleted }: TimerDisplayProps) {
    const progress = getProgress(timeLeft, timerType);
    const timerColorClasses = getTimerColorClasses(timerType, isCompleted);
    const progressBarColorClasses = getProgressBarColorClasses(timerType);

    return (
        <div className="text-center space-y-4">
            <div className="relative">
                <div className={`text-6xl font-mono font-bold ${timerColorClasses}`}>
                    {formatTime(timeLeft)}
                </div>
                {isCompleted && (
                    <div className="absolute -top-2 -right-2">
                        <Badge variant="default" className="bg-green-600">
                            Hoàn thành!
                        </Badge>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-1000 ${progressBarColorClasses}`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
                {TIMER_LABELS[timerType]} • {Math.floor(TIMER_CONFIG[timerType] / 60)} phút
            </div>
        </div>
    );
}
