"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer as TimerIcon } from 'lucide-react';
import { usePomodoroTimer } from '@/hooks/usePomodoroTimer';
import { TimerTypeSelector } from './TimerTypeSelector';
import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { PomodoroStats } from './PomodoroStats';
import { StatusMessage } from './StatusMessage';

/**
 * PomodoroTimer Component - Component chính cho Pomodoro Timer
 * Kết hợp tất cả các sub-components để tạo giao diện hoàn chỉnh:
 * - TimerTypeSelector: Chọn loại timer (focus, short break, long break)
 * - TimerDisplay: Hiển thị thời gian và progress bar
 * - TimerControls: Các nút điều khiển (start, pause, reset)
 * - PomodoroStats: Thống kê các phiên pomodoro trong ngày
 * - StatusMessage: Thông báo trạng thái timer
 * @returns JSX.Element
 */
export function PomodoroTimer() {
    // Lấy state và functions từ usePomodoroTimer hook
    const {
        timerState,      // State của timer (type, timeLeft, isRunning, isCompleted)
        todaySessions,   // Danh sách các phiên pomodoro hôm nay
        changeTimerType, // Function thay đổi loại timer
        toggleTimer,     // Function bắt đầu/tạm dừng timer
        resetTimer       // Function reset timer về trạng thái ban đầu
    } = usePomodoroTimer();

    return (
        <Card className="w-full max-w-md mx-auto">
            {/* ========== HEADER ========== */}
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-center justify-center">
                    <TimerIcon className="h-6 w-6" />
                    <span>Timer Pomodoro</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* ========== TIMER TYPE SELECTION ========== */}
                {/* Component chọn loại timer (focus, short break, long break) */}
                <TimerTypeSelector
                    timerType={timerState.timerType}
                    isRunning={timerState.isRunning}
                    onTimerTypeChange={changeTimerType}
                />

                {/* ========== TIMER DISPLAY ========== */}
                {/* Component hiển thị thời gian và progress bar */}
                <TimerDisplay
                    timerType={timerState.timerType}
                    timeLeft={timerState.timeLeft}
                    isCompleted={timerState.isCompleted}
                />

                {/* ========== CONTROL BUTTONS ========== */}
                {/* Component các nút điều khiển timer */}
                <TimerControls
                    timerType={timerState.timerType}
                    timeLeft={timerState.timeLeft}
                    isRunning={timerState.isRunning}
                    isCompleted={timerState.isCompleted}
                    onToggleTimer={toggleTimer}
                    onResetTimer={resetTimer}
                />

                {/* ========== POMODORO STATS ========== */}
                {/* Component hiển thị thống kê các phiên pomodoro hôm nay */}
                <PomodoroStats todaySessions={todaySessions} />

                {/* ========== STATUS MESSAGES ========== */}
                {/* Component hiển thị thông báo trạng thái timer */}
                <StatusMessage
                    timerType={timerState.timerType}
                    isCompleted={timerState.isCompleted}
                    isRunning={timerState.isRunning}
                />
            </CardContent>
        </Card>
    );
}