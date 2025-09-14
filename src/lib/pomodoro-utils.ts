import { TimerType, TimerConfig, TimerLabels, TimerColors } from '@/types/pomodoro';

// Timer configuration
export const TIMER_CONFIG: TimerConfig = {
    focus: 25 * 60,      // 25 minutes
    shortBreak: 5 * 60,  // 5 minutes
    longBreak: 15 * 60   // 15 minutes
};

export const TIMER_LABELS: TimerLabels = {
    focus: 'Phiên tập trung ngắn',
    shortBreak: 'Phiên nghỉ ngắn',
    longBreak: 'Phiên nghỉ dài'
};

export const TIMER_COLORS: TimerColors = {
    focus: 'bg-blue-600 hover:bg-blue-700',
    shortBreak: 'bg-green-600 hover:bg-green-700',
    longBreak: 'bg-purple-600 hover:bg-purple-700'
};

// Format time display
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Calculate progress percentage
export const getProgress = (timeLeft: number, timerType: TimerType): number => {
    const totalTime = TIMER_CONFIG[timerType];
    return ((totalTime - timeLeft) / totalTime) * 100;
};

// Create beep sound using Web Audio API
export const createBeepSound = (): (() => void) => {
    return () => {
        try {
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
        } catch (error) {
            console.log('Could not create beep sound:', error);
        }
    };
};

// Get timer color classes for display
export const getTimerColorClasses = (timerType: TimerType, isCompleted: boolean = false) => {
    if (isCompleted) return 'text-green-600';

    switch (timerType) {
        case 'focus':
            return 'text-blue-600';
        case 'shortBreak':
            return 'text-green-600';
        case 'longBreak':
            return 'text-purple-600';
        default:
            return 'text-gray-600';
    }
};

// Get progress bar color classes
export const getProgressBarColorClasses = (timerType: TimerType) => {
    switch (timerType) {
        case 'focus':
            return 'bg-blue-600';
        case 'shortBreak':
            return 'bg-green-600';
        case 'longBreak':
            return 'bg-purple-600';
        default:
            return 'bg-gray-600';
    }
};

// Get button color classes
export const getButtonColorClasses = (timerType: TimerType, isCompleted: boolean = false, isRunning: boolean = false) => {
    if (isCompleted) return 'bg-green-600 hover:bg-green-700';
    if (isRunning) return 'bg-amber-600 hover:bg-amber-700';
    return TIMER_COLORS[timerType];
};
