/**
 * Calendar utility functions for date manipulation and formatting
 */

/**
 * Get the Monday of the current week
 */
export const getCurrentWeekStart = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Make Monday the first day
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    return monday;
};

/**
 * Generate an array of 7 dates representing a week starting from Monday
 */
export const generateWeekDays = (weekStart: Date): Date[] => {
    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        weekDays.push(date);
    }
    return weekDays;
};

/**
 * Navigate to previous week
 */
export const getPreviousWeek = (currentWeekStart: Date): Date => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() - 7);
    return newWeekStart;
};

/**
 * Navigate to next week
 */
export const getNextWeek = (currentWeekStart: Date): Date => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + 7);
    return newWeekStart;
};

/**
 * Format week range for display
 */
export const formatWeekRange = (weekStart: Date): string => {
    const endDate = new Date(weekStart);
    endDate.setDate(weekStart.getDate() + 6);
    return `${weekStart.getDate()}/${weekStart.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
};

/**
 * Generate time slots for calendar (24 hours)
 */
export const generateTimeSlots = (): string[] => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return timeSlots;
};

/**
 * Check if a task overlaps with a specific time slot
 */
export const isTaskInTimeSlot = (task: any, hour: number): boolean => {
    // If task has startTime and endTime, check if it overlaps with current time slot
    if (task.startTime && task.endTime) {
        const taskStartHour = parseInt(task.startTime.split(':')[0]);
        const taskEndHour = parseInt(task.endTime.split(':')[0]);
        return hour >= taskStartHour && hour < taskEndHour;
    }
    // If task doesn't have specific time, show it in the first time slot (00:00)
    return hour === 0;
};
