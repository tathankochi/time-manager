/**
 * Analytics utility functions for data processing and formatting
 */

/**
 * Get productivity description based on score
 */
export const getProductivityDescription = (score: number): string => {
    if (score >= 80) return 'Xuất sắc!';
    if (score >= 60) return 'Tốt';
    return 'Cần cải thiện';
};

/**
 * Get productivity trend description
 */
export const getProductivityTrend = (score: number): string => {
    if (score >= 85) return 'tăng';
    if (score >= 60) return 'ổn định';
    return 'giảm';
};

/**
 * Icon mapping for priority levels
 */
export const priorityIconMap = {
    'AlertTriangle': 'AlertTriangle',
    'AlertCircle': 'AlertCircle',
    'Info': 'Info'
} as const;

/**
 * Icon mapping for categories
 */
export const categoryIconMap = {
    'BookOpen': 'BookOpen',
    'User': 'User',
    'Gamepad2': 'Gamepad2',
    'Heart': 'Heart'
} as const;

/**
 * Get priority icon color based on priority level
 */
export const getPriorityIconColor = (priority: string): string => {
    switch (priority) {
        case 'high':
            return "text-red-500 dark:text-red-400";
        case 'medium':
            return "text-yellow-500 dark:text-yellow-400";
        case 'low':
            return "text-green-500 dark:text-green-400";
        default:
            return "text-gray-600 dark:text-gray-400";
    }
};

/**
 * Get category icon name
 */
export const getCategoryIcon = (category: string): string => {
    switch (category) {
        case 'Học tập':
            return 'BookOpen';
        case 'Phát triển bản thân':
            return 'User';
        case 'Giải trí':
            return 'Gamepad2';
        case 'Gia đình':
            return 'Heart';
        default:
            return 'BookOpen';
    }
};

/**
 * Get random motivational quote
 */
export const getRandomQuote = (quotes: string[]): string => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

/**
 * Format completion rate for display
 */
export const formatCompletionRate = (completed: number, total: number): string => {
    if (total === 0) return '0%';
    return `${Math.round((completed / total) * 100)}%`;
};

/**
 * Get completion rate percentage
 */
export const getCompletionRate = (completed: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
};

/**
 * Chart configuration for productivity chart
 */
export const getChartConfig = () => ({
    width: "100%",
    height: "100%",
    margin: {
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
    },
});

/**
 * Tooltip configuration for charts
 */
export const getTooltipConfig = () => ({
    contentStyle: {
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    formatter: (value: number) => [`${value}%`, 'Năng suất']
});

/**
 * Bar chart configuration
 */
export const getBarConfig = () => ({
    dataKey: "productivity",
    fill: "#3B82F6",
    radius: [4, 4, 0, 0]
});
