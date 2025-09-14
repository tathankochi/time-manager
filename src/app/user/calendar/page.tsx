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

export default function CalendarPage() {
    const {
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
    } = useCalendar();
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lịch biểu</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Quản lý thời gian biểu và nhiệm vụ theo tuần
                    </p>
                </div>
                <Button
                    onClick={() => setShowTaskForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo nhiệm vụ mới
                </Button>
            </div>

            {/* Task Form Modal */}
            {showTaskForm && (
                <TaskForm
                    task={selectedTask}
                    onClose={handleCloseTaskForm}
                />
            )}

            {/* Task Statistics */}
            <TaskStatistics stats={taskStats} />

            {/* Week Calendar */}
            <WeekCalendar
                currentWeekStart={currentWeekStart}
                allWeekTasks={allWeekTasks}
                onPreviousWeek={goToPreviousWeek}
                onNextWeek={goToNextWeek}
                onCurrentWeek={goToCurrentWeek}
                onTaskClick={handleTaskClick}
            />

            {/* Search and Filters */}
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

            {/* Search Results */}
            <SearchResults
                filteredTasks={filteredTasks}
                onTaskClick={handleTaskClick}
            />

            {/* Task Detail Modal */}
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
