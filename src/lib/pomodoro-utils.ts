import { TimerType, TimerConfig, TimerLabels, TimerColors } from '@/types/pomodoro';

// ========== CONFIGURATION CONSTANTS ==========

/**
 * Cấu hình thời gian cho các loại timer (tính bằng giây)
 */
export const TIMER_CONFIG: TimerConfig = {
    focus: 25 * 60,      // 25 phút = 1500 giây
    shortBreak: 5 * 60,  // 5 phút = 300 giây
    longBreak: 15 * 60   // 15 phút = 900 giây
};

/**
 * Nhãn hiển thị cho các loại timer (tiếng Việt)
 */
export const TIMER_LABELS: TimerLabels = {
    focus: 'Phiên tập trung ngắn',
    shortBreak: 'Phiên nghỉ ngắn',
    longBreak: 'Phiên nghỉ dài'
};

/**
 * Màu sắc CSS classes cho các loại timer
 */
export const TIMER_COLORS: TimerColors = {
    focus: 'bg-blue-600 hover:bg-blue-700',
    shortBreak: 'bg-green-600 hover:bg-green-700',
    longBreak: 'bg-purple-600 hover:bg-purple-700'
};

// ========== UTILITY FUNCTIONS ==========

/**
 * Format thời gian từ giây thành chuỗi MM:SS
 * @param seconds - Số giây cần format
 * @returns Chuỗi thời gian dạng MM:SS
 */
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Tính phần trăm tiến độ của timer
 * @param timeLeft - Thời gian còn lại (giây)
 * @param timerType - Loại timer
 * @returns Phần trăm tiến độ (0-100)
 */
export const getProgress = (timeLeft: number, timerType: TimerType): number => {
    const totalTime = TIMER_CONFIG[timerType];
    return ((totalTime - timeLeft) / totalTime) * 100;
};

/**
 * Tạo function phát âm thanh beep sử dụng Web Audio API
 * @returns Function để phát âm thanh beep
 */
export const createBeepSound = (): (() => void) => {
    return () => {
        try {
            // Tạo AudioContext (hỗ trợ cả Chrome và Safari)
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            // Kết nối các node audio
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Cấu hình âm thanh
            oscillator.frequency.value = 800; // Tần số 800Hz
            oscillator.type = 'sine'; // Dạng sóng sine

            // Cấu hình âm lượng (fade out)
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

            // Phát âm thanh trong 1 giây
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            console.log('Could not create beep sound:', error);
        }
    };
};

// ========== STYLING HELPER FUNCTIONS ==========

/**
 * Lấy CSS classes cho màu sắc hiển thị timer
 * @param timerType - Loại timer
 * @param isCompleted - Timer đã hoàn thành chưa
 * @returns CSS classes cho màu sắc text
 */
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

/**
 * Lấy CSS classes cho màu sắc progress bar
 * @param timerType - Loại timer
 * @returns CSS classes cho màu sắc background
 */
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

/**
 * Lấy CSS classes cho màu sắc button dựa trên trạng thái timer
 * @param timerType - Loại timer
 * @param isCompleted - Timer đã hoàn thành chưa
 * @param isRunning - Timer đang chạy không
 * @returns CSS classes cho màu sắc button
 */
export const getButtonColorClasses = (timerType: TimerType, isCompleted: boolean = false, isRunning: boolean = false) => {
    if (isCompleted) return 'bg-green-600 hover:bg-green-700';
    if (isRunning) return 'bg-amber-600 hover:bg-amber-700';
    return TIMER_COLORS[timerType];
};
