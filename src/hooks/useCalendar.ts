import { useState, useEffect } from 'react';
import { useTask } from '@/lib/contexts/TaskContext';
import { getCurrentWeekStart, getPreviousWeek, getNextWeek } from '@/lib/calendar-utils';
import { calculateTaskStats, filterTasks, TaskFilters } from '@/lib/task-helpers';

/**
 * Custom hook quản lý state và logic cho Calendar page
 * Bao gồm: navigation tuần, filtering, pagination, task management
 * @returns Object chứa state và functions để sử dụng trong Calendar component
 */
export function useCalendar() {
    // ========== STATE MANAGEMENT ==========

    // State cho navigation tuần
    const [currentWeekStart, setCurrentWeekStart] = useState(() => getCurrentWeekStart());

    // State cho modal và form
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showTaskDetail, setShowTaskDetail] = useState(false);

    // State cho search và filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('todo');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    // State cho pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // 5 items per page

    // Lấy các functions từ TaskContext
    const { tasks, deleteTask, toggleTask, getTasksForWeek, setTaskStatus } = useTask();

    // ========== EFFECTS ==========

    // Đồng bộ selectedTask với tasks từ context khi tasks thay đổi
    useEffect(() => {
        if (selectedTask) {
            const updatedTask = tasks.find(task => task.id === selectedTask.id);
            if (updatedTask) {
                setSelectedTask(updatedTask);
            }
        }
    }, [tasks, selectedTask]);

    // Reset về trang đầu tiên khi filters thay đổi
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus, filterPriority, filterCategory]);

    // ========== COMPUTED VALUES ==========

    // Lấy tasks cho tuần hiện tại
    const allWeekTasks = getTasksForWeek(currentWeekStart);

    // Tính toán thống kê tasks
    const taskStats = calculateTaskStats(tasks);

    // Tạo object filters cho việc lọc tasks
    const filters: TaskFilters = {
        searchTerm,
        filterStatus,
        filterPriority,
        filterCategory
    };

    // Lọc tất cả tasks theo filters
    const allFilteredTasks = filterTasks(tasks, filters);

    // ========== PAGINATION LOGIC ==========

    // Tính tổng số trang
    const totalPages = Math.ceil(allFilteredTasks.length / itemsPerPage);

    // Tính index bắt đầu và kết thúc cho trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Lấy tasks cho trang hiện tại
    const filteredTasks = allFilteredTasks.slice(startIndex, endIndex);

    // ========== NAVIGATION FUNCTIONS ==========

    /**
     * Chuyển về tuần hiện tại
     */
    const goToCurrentWeek = () => {
        setCurrentWeekStart(getCurrentWeekStart());
    };

    /**
     * Chuyển về tuần trước
     */
    const goToPreviousWeek = () => {
        setCurrentWeekStart(getPreviousWeek(currentWeekStart));
    };

    /**
     * Chuyển về tuần sau
     */
    const goToNextWeek = () => {
        setCurrentWeekStart(getNextWeek(currentWeekStart));
    };

    // ========== TASK HANDLERS ==========

    /**
     * Xử lý khi user click vào một task
     * @param task - Task được click
     */
    const handleTaskClick = (task: any) => {
        setSelectedTask(task);
        setShowTaskDetail(true);
    };

    /**
     * Xử lý khi user muốn edit một task
     * @param task - Task cần edit
     */
    const handleEditTask = (task: any) => {
        setSelectedTask(task);
        setShowTaskDetail(false);
        setShowTaskForm(true);
    };

    /**
     * Đóng form tạo/sửa task
     */
    const handleCloseTaskForm = () => {
        setShowTaskForm(false);
        setSelectedTask(null);
    };

    /**
     * Đóng modal chi tiết task
     */
    const handleCloseTaskDetail = () => {
        setShowTaskDetail(false);
        setSelectedTask(null);
    };

    /**
     * Xóa một task
     * @param taskId - ID của task cần xóa
     */
    const handleDeleteTask = (taskId: string) => {
        deleteTask(taskId);
        setShowTaskDetail(false);
        setSelectedTask(null);
    };

    /**
     * Thay đổi status của một task
     * @param taskId - ID của task
     * @param status - Status mới (todo, miss, completed)
     */
    const handleTaskStatusChange = (taskId: string, status: 'todo' | 'miss' | 'completed') => {
        setTaskStatus(taskId, status);
        setShowTaskDetail(false);
    };

    // ========== PAGINATION HANDLERS ==========

    /**
     * Chuyển đến một trang cụ thể
     * @param page - Số trang cần chuyển đến
     */
    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    /**
     * Chuyển đến trang tiếp theo
     */
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    /**
     * Chuyển về trang trước đó
     */
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // ========== RETURN VALUES ==========

    return {
        // ========== STATE ==========
        currentWeekStart,
        showTaskForm,
        selectedTask,
        showFilters,
        showTaskDetail,
        searchTerm,
        filterStatus,
        filterPriority,
        filterCategory,

        // ========== DATA ==========
        allWeekTasks,
        taskStats,
        filteredTasks,
        allFilteredTasks,

        // ========== PAGINATION ==========
        currentPage,
        totalPages,
        itemsPerPage,

        // ========== NAVIGATION ==========
        goToCurrentWeek,
        goToPreviousWeek,
        goToNextWeek,

        // ========== TASK HANDLERS ==========
        handleTaskClick,
        handleEditTask,
        handleCloseTaskForm,
        handleCloseTaskDetail,
        handleDeleteTask,
        handleTaskStatusChange,

        // ========== SETTERS ==========
        setShowTaskForm,
        setSearchTerm,
        setShowFilters,
        setFilterStatus,
        setFilterPriority,
        setFilterCategory,

        // ========== PAGINATION HANDLERS ==========
        goToPage,
        goToNextPage,
        goToPreviousPage
    };
}
