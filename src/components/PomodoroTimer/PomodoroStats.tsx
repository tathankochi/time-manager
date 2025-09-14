import { PomodoroSession } from '@/types/pomodoro';

interface PomodoroStatsProps {
    todaySessions: PomodoroSession[];
}

export function PomodoroStats({ todaySessions }: PomodoroStatsProps) {
    const focusSessions = todaySessions.filter(s => s.type === 'focus').length;
    const longBreakSessions = todaySessions.filter(s => s.type === 'longBreak').length;
    const shortBreakSessions = todaySessions.filter(s => s.type === 'shortBreak').length;

    return (
        <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-600">
                    {focusSessions}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                    Phiên tập trung hôm nay
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <div className="text-lg font-bold text-green-600">
                    {longBreakSessions}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                    Phiên nghỉ dài hôm nay
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-600">
                    {shortBreakSessions}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                    Phiên nghỉ ngắn hôm nay
                </div>
            </div>
        </div>
    );
}
