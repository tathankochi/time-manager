import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';

/**
 * Custom hook for dashboard state management and data
 */
export function useDashboard() {
    const { user } = useUser();
    const { tasks, todayTasks, productivityScore, completedTasks } = useAnalyticsData();
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    return {
        // User data
        user,

        // Time
        currentTime,

        // Analytics data
        tasks,
        todayTasks,
        productivityScore,
        completedTasks,

        // Computed values
        userName: user?.fullName || 'Người dùng'
    };
}
