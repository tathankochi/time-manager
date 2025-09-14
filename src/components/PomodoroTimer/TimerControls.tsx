import { Button } from '@/components/ui/button';
import { TimerType } from '@/types/pomodoro';
import { getButtonColorClasses, TIMER_CONFIG } from '@/lib/pomodoro-utils';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerControlsProps {
    timerType: TimerType;
    timeLeft: number;
    isRunning: boolean;
    isCompleted: boolean;
    onToggleTimer: () => void;
    onResetTimer: () => void;
}

export function TimerControls({
    timerType,
    timeLeft,
    isRunning,
    isCompleted,
    onToggleTimer,
    onResetTimer
}: TimerControlsProps) {
    const buttonColorClasses = getButtonColorClasses(timerType, isCompleted, isRunning);
    const isResetDisabled = timeLeft === TIMER_CONFIG[timerType] && !isRunning;

    return (
        <div className="flex justify-center space-x-3">
            <Button
                onClick={onToggleTimer}
                size="lg"
                className={buttonColorClasses}
            >
                {isCompleted ? (
                    <>
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Bắt đầu lại
                    </>
                ) : isRunning ? (
                    <>
                        <Pause className="h-5 w-5 mr-2" />
                        Tạm dừng
                    </>
                ) : (
                    <>
                        <Play className="h-5 w-5 mr-2" />
                        Bắt đầu
                    </>
                )}
            </Button>

            <Button
                onClick={onResetTimer}
                variant="outline"
                size="lg"
                disabled={isResetDisabled}
            >
                <RotateCcw className="h-5 w-5 mr-2" />
                Đặt lại
            </Button>
        </div>
    );
}
