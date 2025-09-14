import { useState, useEffect, useRef } from 'react';
import { TimerType, TimerState } from '@/types/pomodoro';
import { useTask } from '@/lib/contexts/TaskContext';
import { TIMER_CONFIG, createBeepSound } from '@/lib/pomodoro-utils';

export const usePomodoroTimer = () => {
    const { addPomodoroSession, getTodayPomodoroSessions } = useTask();
    const [timerState, setTimerState] = useState<TimerState>({
        timerType: 'focus',
        timeLeft: TIMER_CONFIG.focus,
        isRunning: false,
        isCompleted: false
    });

    const audioRef = useRef<{ play: () => void } | null>(null);

    // Initialize audio
    useEffect(() => {
        audioRef.current = { play: createBeepSound() };
    }, []);

    // Timer countdown effect
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timerState.isRunning && timerState.timeLeft > 0) {
            interval = setInterval(() => {
                setTimerState((prev) => {
                    if (prev.timeLeft <= 1) {
                        // Timer completed
                        const duration = TIMER_CONFIG[prev.timerType] / 60; // Convert to minutes
                        addPomodoroSession(prev.timerType, duration);

                        // Play notification sound
                        if (audioRef.current) {
                            try {
                                audioRef.current.play();
                            } catch (error) {
                                console.log('Could not play notification sound');
                            }
                        }

                        return {
                            ...prev,
                            timeLeft: 0,
                            isRunning: false,
                            isCompleted: true
                        };
                    }
                    return {
                        ...prev,
                        timeLeft: prev.timeLeft - 1
                    };
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerState.isRunning, timerState.timeLeft, addPomodoroSession]);

    // Change timer type
    const changeTimerType = (type: TimerType) => {
        setTimerState({
            timerType: type,
            timeLeft: TIMER_CONFIG[type],
            isRunning: false,
            isCompleted: false
        });
    };

    // Start/Pause timer
    const toggleTimer = () => {
        if (timerState.isCompleted) {
            resetTimer();
        } else {
            setTimerState(prev => ({
                ...prev,
                isRunning: !prev.isRunning
            }));
        }
    };

    // Reset timer
    const resetTimer = () => {
        setTimerState({
            timerType: timerState.timerType,
            timeLeft: TIMER_CONFIG[timerState.timerType],
            isRunning: false,
            isCompleted: false
        });
    };

    // Get today's sessions
    const todaySessions = getTodayPomodoroSessions();

    return {
        timerState,
        todaySessions,
        changeTimerType,
        toggleTimer,
        resetTimer
    };
};
