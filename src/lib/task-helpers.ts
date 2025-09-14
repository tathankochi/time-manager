/**
 * Task-related helper functions for styling, formatting, and calculations
 */

/**
 * Get category color classes for task display
 */
export const getCategoryColor = (category: string): string => {
    switch (category) {
        case 'Học tập': return 'bg-green-500 border-green-600 text-white';
        case 'Phát triển bản thân': return 'bg-yellow-500 border-yellow-600 text-white';
        case 'Giải trí': return 'bg-purple-500 border-purple-600';
        case 'Gia đình': return 'bg-red-500 border-red-600';
        default: return 'bg-gray-500 border-gray-600';
    }
};

/**
 * Get priority color variant for badges
 */
export const getPriorityColor = (priority: string): "destructive" | "default" | "secondary" => {
    switch (priority) {
        case 'high': return 'destructive';
        case 'medium': return 'default';
        case 'low': return 'secondary';
        default: return 'secondary';
    }
};

/**
 * Get priority text in Vietnamese
 */
export const getPriorityText = (priority: string): string => {
    switch (priority) {
        case 'high': return 'Cao';
        case 'medium': return 'Trung bình';
        case 'low': return 'Thấp';
        default: return 'Thấp';
    }
};

/**
 * Get status color classes for task display
 */
export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'completed': return 'bg-green-100 border-green-300 text-green-800';
        case 'miss': return 'bg-red-100 border-red-300 text-red-800';
        case 'todo': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
        default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
};

/**
 * Get status icon for task display
 */
export const getStatusIcon = (status: string): string => {
    switch (status) {
        case 'completed': return '✓';
        case 'miss': return '✗';
        case 'todo': return '○';
        default: return '○';
    }
};

/**
 * Get status text in Vietnamese
 */
export const getStatusText = (status: string): string => {
    switch (status) {
        case 'completed': return 'Hoàn thành';
        case 'miss': return 'Bỏ lỡ';
        case 'todo': return 'Chưa làm';
        default: return 'Chưa làm';
    }
};

/**
 * Calculate task statistics
 */
export interface TaskStats {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
}

export const calculateTaskStats = (tasks: any[]): TaskStats => {
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'todo').length,
        overdue: tasks.filter(t => t.status === 'miss').length
    };
};

/**
 * Filter tasks based on search and filter criteria
 */
export interface TaskFilters {
    searchTerm: string;
    filterStatus: string;
    filterPriority: string;
    filterCategory: string;
}

export const filterTasks = (tasks: any[], filters: TaskFilters): any[] => {
    return tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchesStatus = filters.filterStatus === 'all' ||
            (filters.filterStatus === 'completed' ? task.status === 'completed' :
                filters.filterStatus === 'todo' ? task.status === 'todo' :
                    filters.filterStatus === 'miss' ? task.status === 'miss' : true);
        const matchesPriority = filters.filterPriority === 'all' || task.priority === filters.filterPriority;
        const matchesCategory = filters.filterCategory === 'all' || task.category === filters.filterCategory;

        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
};
