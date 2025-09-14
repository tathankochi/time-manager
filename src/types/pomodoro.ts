export type TimerType = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerConfig {
    focus: number;
    shortBreak: number;
    longBreak: number;
}

export interface PomodoroSession {
    id: string;
    type: TimerType;
    duration: number; // in minutes
    completedAt: Date;
}

export interface PomodoroStats {
    totalFocusSessions: number;
    totalShortBreaks: number;
    totalLongBreaks: number;
    totalTime: number; // in minutes
}

export interface TimerState {
    timerType: TimerType;
    timeLeft: number;
    isRunning: boolean;
    isCompleted: boolean;
}

export interface TimerLabels {
    focus: string;
    shortBreak: string;
    longBreak: string;
}

export interface TimerColors {
    focus: string;
    shortBreak: string;
    longBreak: string;
}
