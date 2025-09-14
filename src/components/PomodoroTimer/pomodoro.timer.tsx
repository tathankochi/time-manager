"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer as TimerIcon } from 'lucide-react';
import { usePomodoroTimer } from '@/hooks/usePomodoroTimer';
import { TimerTypeSelector } from './TimerTypeSelector';
import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { PomodoroStats } from './PomodoroStats';
import { StatusMessage } from './StatusMessage';

export function PomodoroTimer() {
    const {
        timerState,
        todaySessions,
        changeTimerType,
        toggleTimer,
        resetTimer
    } = usePomodoroTimer();

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-center justify-center">
                    <TimerIcon className="h-6 w-6" />
                    <span>Timer Pomodoro</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Timer Type Selection */}
                <TimerTypeSelector
                    timerType={timerState.timerType}
                    isRunning={timerState.isRunning}
                    onTimerTypeChange={changeTimerType}
                />

                {/* Timer Display */}
                <TimerDisplay
                    timerType={timerState.timerType}
                    timeLeft={timerState.timeLeft}
                    isCompleted={timerState.isCompleted}
                />

                {/* Control Buttons */}
                <TimerControls
                    timerType={timerState.timerType}
                    timeLeft={timerState.timeLeft}
                    isRunning={timerState.isRunning}
                    isCompleted={timerState.isCompleted}
                    onToggleTimer={toggleTimer}
                    onResetTimer={resetTimer}
                />

                {/* Pomodoro Stats */}
                <PomodoroStats todaySessions={todaySessions} />

                {/* Status Messages */}
                <StatusMessage
                    timerType={timerState.timerType}
                    isCompleted={timerState.isCompleted}
                    isRunning={timerState.isRunning}
                />
            </CardContent>
        </Card>
    );
}