import { useState, useEffect, useRef } from 'react';
import { TimerType, TimerState } from '@/types/pomodoro';
import { useTask } from '@/lib/contexts/TaskContext';
import { TIMER_CONFIG, createBeepSound } from '@/lib/pomodoro-utils';

/**
 * Custom hook quản lý state và logic cho Pomodoro Timer
 * Bao gồm: timer countdown, audio notifications, session tracking
 * @returns Object chứa timer state và control functions
 */
export const usePomodoroTimer = () => {
    // Lấy functions từ TaskContext để quản lý pomodoro sessions
    const { addPomodoroSession, getTodayPomodoroSessions } = useTask();

    // State chính của timer
    const [timerState, setTimerState] = useState<TimerState>({
        timerType: 'focus',           // Loại timer hiện tại
        timeLeft: TIMER_CONFIG.focus, // Thời gian còn lại (giây)
        isRunning: false,             // Timer có đang chạy không
        isCompleted: false            // Timer đã hoàn thành chưa
    });

    // Ref để lưu audio function cho notification sound
    const audioRef = useRef<{ play: () => void } | null>(null);

    // ========== EFFECTS ==========

    // Khởi tạo audio function cho notification sound
    useEffect(() => {
        audioRef.current = { play: createBeepSound() };
    }, []);

    // Effect xử lý countdown timer
    useEffect(() => {
        let interval: NodeJS.Timeout;

        // Chỉ chạy countdown khi timer đang running và còn thời gian
        if (timerState.isRunning && timerState.timeLeft > 0) {
            interval = setInterval(() => {
                setTimerState((prev) => {
                    if (prev.timeLeft <= 1) {
                        // Timer hoàn thành
                        const duration = TIMER_CONFIG[prev.timerType] / 60; // Convert to minutes
                        addPomodoroSession(prev.timerType, duration);

                        // Phát âm thanh thông báo
                        if (audioRef.current) {
                            try {
                                audioRef.current.play();
                            } catch (error) {
                                console.log('Could not play notification sound');
                            }
                        }

                        // Cập nhật state khi timer hoàn thành
                        return {
                            ...prev,
                            timeLeft: 0,
                            isRunning: false,
                            isCompleted: true
                        };
                    }
                    // Giảm thời gian còn lại 1 giây
                    return {
                        ...prev,
                        timeLeft: prev.timeLeft - 1
                    };
                });
            }, 1000);
        }

        // Cleanup interval khi component unmount hoặc dependencies thay đổi
        return () => clearInterval(interval);
    }, [timerState.isRunning, timerState.timeLeft, addPomodoroSession]);

    // ========== TIMER CONTROL FUNCTIONS ==========

    /**
     * Thay đổi loại timer (focus, shortBreak, longBreak)
     * @param type - Loại timer mới
     */
    const changeTimerType = (type: TimerType) => {
        setTimerState({
            timerType: type,
            timeLeft: TIMER_CONFIG[type],
            isRunning: false,
            isCompleted: false
        });
    };

    /**
     * Bắt đầu/tạm dừng timer hoặc reset nếu đã hoàn thành
     */
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

    /**
     * Reset timer về trạng thái ban đầu của loại timer hiện tại
     */
    const resetTimer = () => {
        setTimerState({
            timerType: timerState.timerType,
            timeLeft: TIMER_CONFIG[timerState.timerType],
            isRunning: false,
            isCompleted: false
        });
    };

    // ========== COMPUTED VALUES ==========

    // Lấy danh sách các phiên pomodoro hôm nay
    const todaySessions = getTodayPomodoroSessions();

    // ========== RETURN VALUES ==========

    return {
        timerState,      // State hiện tại của timer
        todaySessions,   // Danh sách sessions hôm nay
        changeTimerType, // Function thay đổi loại timer
        toggleTimer,     // Function bắt đầu/tạm dừng timer
        resetTimer       // Function reset timer
    };
};
