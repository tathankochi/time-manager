import { useState, useEffect } from 'react';
import { useTask } from '@/lib/contexts/TaskContext';
import { getCurrentWeekStart, getPreviousWeek, getNextWeek } from '@/lib/calendar-utils';
import { calculateTaskStats, filterTasks, TaskFilters } from '@/lib/task-helpers';

export function useCalendar() {
    const [currentWeekStart, setCurrentWeekStart] = useState(() => getCurrentWeekStart());
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('todo');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    const { tasks, deleteTask, toggleTask, getTasksForWeek, setTaskStatus } = useTask();

    // Sync selectedTask with tasks from context
    useEffect(() => {
        if (selectedTask) {
            const updatedTask = tasks.find(task => task.id === selectedTask.id);
            if (updatedTask) {
                setSelectedTask(updatedTask);
            }
        }
    }, [tasks, selectedTask]);

    // Get tasks for current week
    const allWeekTasks = getTasksForWeek(currentWeekStart);

    // Calculate task statistics
    const taskStats = calculateTaskStats(tasks);

    // Filter tasks
    const filters: TaskFilters = {
        searchTerm,
        filterStatus,
        filterPriority,
        filterCategory
    };
    const filteredTasks = filterTasks(tasks, filters);

    // Navigation functions
    const goToCurrentWeek = () => {
        setCurrentWeekStart(getCurrentWeekStart());
    };

    const goToPreviousWeek = () => {
        setCurrentWeekStart(getPreviousWeek(currentWeekStart));
    };

    const goToNextWeek = () => {
        setCurrentWeekStart(getNextWeek(currentWeekStart));
    };

    // Task handlers
    const handleTaskClick = (task: any) => {
        setSelectedTask(task);
        setShowTaskDetail(true);
    };

    const handleEditTask = (task: any) => {
        setSelectedTask(task);
        setShowTaskDetail(false);
        setShowTaskForm(true);
    };

    const handleCloseTaskForm = () => {
        setShowTaskForm(false);
        setSelectedTask(null);
    };

    const handleCloseTaskDetail = () => {
        setShowTaskDetail(false);
        setSelectedTask(null);
    };

    const handleDeleteTask = (taskId: string) => {
        deleteTask(taskId);
        setShowTaskDetail(false);
        setSelectedTask(null);
    };

    const handleTaskStatusChange = (taskId: string, status: string) => {
        setTaskStatus(taskId, status);
        setShowTaskDetail(false);
    };

    return {
        // State
        currentWeekStart,
        showTaskForm,
        selectedTask,
        showFilters,
        showTaskDetail,
        searchTerm,
        filterStatus,
        filterPriority,
        filterCategory,

        // Data
        allWeekTasks,
        taskStats,
        filteredTasks,

        // Navigation
        goToCurrentWeek,
        goToPreviousWeek,
        goToNextWeek,

        // Task handlers
        handleTaskClick,
        handleEditTask,
        handleCloseTaskForm,
        handleCloseTaskDetail,
        handleDeleteTask,
        handleTaskStatusChange,

        // Setters
        setShowTaskForm,
        setSearchTerm,
        setShowFilters,
        setFilterStatus,
        setFilterPriority,
        setFilterCategory
    };
}
