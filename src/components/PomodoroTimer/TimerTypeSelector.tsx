import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TimerType } from '@/types/pomodoro';
import { TIMER_CONFIG, TIMER_LABELS, TIMER_COLORS } from '@/lib/pomodoro-utils';
import { Clock, Coffee } from 'lucide-react';

interface TimerTypeSelectorProps {
    timerType: TimerType;
    isRunning: boolean;
    onTimerTypeChange: (type: TimerType) => void;
}

export function TimerTypeSelector({
    timerType,
    isRunning,
    onTimerTypeChange
}: TimerTypeSelectorProps) {
    const timerTypes: TimerType[] = ['focus', 'shortBreak', 'longBreak'];

    const getIcon = (type: TimerType) => {
        switch (type) {
            case 'focus':
                return <Clock className="h-4 w-4" />;
            case 'shortBreak':
            case 'longBreak':
                return <Coffee className="h-4 w-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Chọn loại đồng hồ:
            </label>
            <div className="grid grid-cols-1 gap-2">
                {timerTypes.map((type) => (
                    <Button
                        key={type}
                        variant={timerType === type ? "default" : "outline"}
                        onClick={() => onTimerTypeChange(type)}
                        disabled={isRunning}
                        className={`justify-start ${timerType === type ? TIMER_COLORS[type] : ''}`}
                    >
                        <div className="flex items-center space-x-2">
                            {getIcon(type)}
                            <span>{TIMER_LABELS[type]}</span>
                            <Badge variant="secondary" className="ml-auto">
                                {Math.floor(TIMER_CONFIG[type] / 60)} phút
                            </Badge>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
}
