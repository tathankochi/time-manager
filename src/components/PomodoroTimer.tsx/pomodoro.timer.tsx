"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTask } from '@/lib/contexts/TaskContext';
import {
    Play,
    Pause,
    RotateCcw,
    Clock,
    Coffee,
    Timer as TimerIcon
} from 'lucide-react';

type TimerType = 'focus' | 'shortBreak' | 'longBreak';

interface TimerConfig {
    focus: number;
    shortBreak: number;
    longBreak: number;
}

export function PomodoroTimer() {
    const { addPomodoroSession, getTodayPomodoroSessions, getPomodoroStats } = useTask();
    const [timerType, setTimerType] = useState<TimerType>('focus');
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Lấy thống kê pomodoro
    const todaySessions = getTodayPomodoroSessions();

    const timerConfig: TimerConfig = {
        focus: 25 * 60,      // 25 minutes
        shortBreak: 5 * 60,  // 5 minutes
        longBreak: 15 * 60   // 15 minutes
    };

    const timerLabels = {
        focus: 'Phiên tập trung ngắn',
        shortBreak: 'Phiên nghỉ ngắn',
        longBreak: 'Phiên nghỉ dài'
    };

    const timerColors = {
        focus: 'bg-blue-600 hover:bg-blue-700',
        shortBreak: 'bg-green-600 hover:bg-green-700',
        longBreak: 'bg-purple-600 hover:bg-purple-700'
    };

    // Initialize audio
    useEffect(() => {
        // Create a simple beep sound using Web Audio API
        const createBeepSound = () => {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        };

        audioRef.current = { play: createBeepSound } as any;
    }, []);

    // Timer countdown effect
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setIsCompleted(true);

                        // Lưu pomodoro session vào context
                        const duration = timerConfig[timerType] / 60; // Convert to minutes
                        addPomodoroSession(timerType, duration);

                        // Play notification sound
                        if (audioRef.current) {
                            try {
                                audioRef.current.play();
                            } catch (error) {
                                console.log('Could not play notification sound');
                            }
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    // Change timer type
    const changeTimerType = (type: TimerType) => {
        setTimerType(type);
        setTimeLeft(timerConfig[type]);
        setIsRunning(false);
        setIsCompleted(false);
    };

    // Start/Pause timer
    const toggleTimer = () => {
        if (isCompleted) {
            resetTimer();
        } else {
            setIsRunning(!isRunning);
        }
    };

    // Reset timer
    const resetTimer = () => {
        setTimeLeft(timerConfig[timerType]);
        setIsRunning(false);
        setIsCompleted(false);
    };

    // Format time display
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Calculate progress percentage
    const getProgress = () => {
        const totalTime = timerConfig[timerType];
        return ((totalTime - timeLeft) / totalTime) * 100;
    };

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
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Chọn loại đồng hồ:
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                        {(Object.keys(timerConfig) as TimerType[]).map((type) => (
                            <Button
                                key={type}
                                variant={timerType === type ? "default" : "outline"}
                                onClick={() => changeTimerType(type)}
                                disabled={isRunning}
                                className={`justify-start ${timerType === type ? timerColors[type] : ''}`}
                            >
                                <div className="flex items-center space-x-2">
                                    {type === 'focus' && <Clock className="h-4 w-4" />}
                                    {type === 'shortBreak' && <Coffee className="h-4 w-4" />}
                                    {type === 'longBreak' && <Coffee className="h-4 w-4" />}
                                    <span>{timerLabels[type]}</span>
                                    <Badge variant="secondary" className="ml-auto">
                                        {Math.floor(timerConfig[type] / 60)} phút
                                    </Badge>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Timer Display */}
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className={`text-6xl font-mono font-bold ${isCompleted ? 'text-green-600' :
                            timerType === 'focus' ? 'text-blue-600' :
                                timerType === 'shortBreak' ? 'text-green-600' : 'text-purple-600'
                            }`}>
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
                            className={`h-2 rounded-full transition-all duration-1000 ${timerType === 'focus' ? 'bg-blue-600' :
                                timerType === 'shortBreak' ? 'bg-green-600' : 'bg-purple-600'
                                }`}
                            style={{ width: `${getProgress()}%` }}
                        />
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {timerLabels[timerType]} • {Math.floor(timerConfig[timerType] / 60)} phút
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center space-x-3">
                    <Button
                        onClick={toggleTimer}
                        size="lg"
                        className={`${isCompleted ? 'bg-green-600 hover:bg-green-700' :
                            isRunning ? 'bg-amber-600 hover:bg-amber-700' : timerColors[timerType]
                            }`}
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
                        onClick={resetTimer}
                        variant="outline"
                        size="lg"
                        disabled={timeLeft === timerConfig[timerType] && !isRunning}
                    >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Đặt lại
                    </Button>
                </div>

                {/* Pomodoro Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-lg font-bold text-blue-600">
                            {todaySessions.filter(s => s.type === 'focus').length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Phiên tập trung hôm nay
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">
                            {todaySessions.filter(s => s.type === 'longBreak').length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Phiên nghỉ dài hôm nay
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-lg font-bold text-purple-600">
                            {todaySessions.filter(s => s.type === 'shortBreak').length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Phiên nghỉ ngắn hôm nay
                        </div>
                    </div>
                </div>

                {/* Status Messages */}
                {isCompleted && (
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                        <p className="text-green-800 dark:text-green-200 font-medium">
                            🎉 {timerLabels[timerType]} đã hoàn thành!
                        </p>
                        <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                            {timerType === 'focus' ? 'Hãy nghỉ ngơi một chút!' : 'Sẵn sàng cho phiên tiếp theo!'}
                        </p>
                    </div>
                )}

                {isRunning && (
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <p className="text-blue-800 dark:text-blue-200 font-medium">
                            ⏰ {timerLabels[timerType]} đang chạy...
                        </p>
                        <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                            {timerType === 'focus' ? 'Tập trung vào công việc!' : 'Thời gian nghỉ ngơi!'}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}