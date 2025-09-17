"use client";
import { TaskForm } from "@/components/Tasks/task.form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCalendar } from "@/hooks/useCalendar";
import {
    TaskStatistics,
    WeekCalendar,
    TaskDetailModal,
    SearchAndFilters,
    SearchResults
} from "@/components/features/calendar";

/**
 * Calendar Page Component
 * Trang chính hiển thị lịch biểu tuần với các tính năng:
 * - Hiển thị lịch tuần với tasks
 * - Tìm kiếm và lọc tasks
 * - Phân trang kết quả tìm kiếm
 * - Tạo/sửa/xóa tasks
 * - Thống kê tasks
 * @returns JSX.Element
 */
export default function CalendarPage() {
    // Lấy tất cả state và functions từ useCalendar hook
    const {
        // ========== STATE ==========
        currentWeekStart,        // Ngày bắt đầu của tuần hiện tại
        showTaskForm,           // Hiển thị form tạo/sửa task
        selectedTask,           // Task đang được chọn
        showFilters,            // Hiển thị panel filters
        showTaskDetail,         // Hiển thị modal chi tiết task
        searchTerm,             // Từ khóa tìm kiếm
        filterStatus,           // Filter theo status
        filterPriority,         // Filter theo priority
        filterCategory,         // Filter theo category

        // ========== DATA ==========
        allWeekTasks,           // Tất cả tasks của tuần hiện tại
        taskStats,              // Thống kê tasks
        filteredTasks,          // Tasks đã filter và phân trang
        allFilteredTasks,       // Tất cả tasks đã filter (chưa phân trang)

        // ========== PAGINATION ==========
        currentPage,            // Trang hiện tại
        totalPages,             // Tổng số trang
        itemsPerPage,           // Số items per page

        // ========== NAVIGATION ==========
        goToCurrentWeek,        // Chuyển về tuần hiện tại
        goToPreviousWeek,       // Chuyển về tuần trước
        goToNextWeek,           // Chuyển về tuần sau

        // ========== TASK HANDLERS ==========
        handleTaskClick,        // Xử lý click vào task
        handleEditTask,         // Xử lý edit task
        handleCloseTaskForm,    // Đóng form task
        handleCloseTaskDetail,  // Đóng modal chi tiết
        handleDeleteTask,       // Xóa task
        handleTaskStatusChange, // Thay đổi status task

        // ========== SETTERS ==========
        setShowTaskForm,        // Set hiển thị form
        setSearchTerm,          // Set từ khóa tìm kiếm
        setShowFilters,         // Set hiển thị filters
        setFilterStatus,        // Set filter status
        setFilterPriority,      // Set filter priority
        setFilterCategory,      // Set filter category

        // ========== PAGINATION HANDLERS ==========
        goToPage,               // Chuyển đến trang cụ thể
        goToNextPage,           // Chuyển đến trang tiếp theo
        goToPreviousPage        // Chuyển về trang trước
    } = useCalendar();
    return (
        <div className="space-y-6">
            {/* ========== HEADER SECTION ========== */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lịch biểu</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Quản lý thời gian biểu và nhiệm vụ theo tuần
                    </p>
                </div>
                {/* Nút tạo task mới */}
                <Button
                    onClick={() => setShowTaskForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo nhiệm vụ mới
                </Button>
            </div>

            {/* ========== MODAL SECTION ========== */}
            {/* Modal form tạo/sửa task */}
            {showTaskForm && (
                <TaskForm
                    task={selectedTask}
                    onClose={handleCloseTaskForm}
                />
            )}

            {/* ========== STATISTICS SECTION ========== */}
            {/* Hiển thị thống kê tasks */}
            <TaskStatistics stats={taskStats} />

            {/* ========== CALENDAR SECTION ========== */}
            {/* Lịch tuần chính với navigation */}
            <WeekCalendar
                currentWeekStart={currentWeekStart}
                allWeekTasks={allWeekTasks}
                onPreviousWeek={goToPreviousWeek}
                onNextWeek={goToNextWeek}
                onCurrentWeek={goToCurrentWeek}
                onTaskClick={handleTaskClick}
            />

            {/* ========== SEARCH & FILTER SECTION ========== */}
            {/* Tìm kiếm và bộ lọc tasks */}
            <SearchAndFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
            />

            {/* ========== SEARCH RESULTS SECTION ========== */}
            {/* Kết quả tìm kiếm với phân trang */}
            <SearchResults
                filteredTasks={filteredTasks}
                allFilteredTasks={allFilteredTasks}
                currentPage={currentPage}
                totalPages={totalPages}
                onTaskClick={handleTaskClick}
                onPageChange={goToPage}
                onPreviousPage={goToPreviousPage}
                onNextPage={goToNextPage}
            />

            {/* ========== TASK DETAIL MODAL ========== */}
            {/* Modal chi tiết task */}
            {showTaskDetail && (
                <TaskDetailModal
                    task={selectedTask}
                    onClose={handleCloseTaskDetail}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleTaskStatusChange}
                />
            )}
        </div>
    );
}
