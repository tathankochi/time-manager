"use client";
import { TaskFilters } from "@/components/Tasks/task.filters";
import { TaskForm } from "@/components/Tasks/task.form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTask } from "@/lib/contexts/TaskContext";
import { AlertCircle, CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Circle, Clock, Edit, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function CalendarPage() {
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Make Monday the first day
        const monday = new Date(today);
        monday.setDate(today.getDate() + mondayOffset);
        monday.setHours(0, 0, 0, 0);
        //Trả về ngày thứ 2 gần nhất
        return monday;
    });
    const { tasks, deleteTask, toggleTask, getTasksForWeek } = useTask();
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    // Đồng bộ selectedTask với tasks từ context
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
    // Task statistics
    const taskStats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed && t.deadline && new Date(t.deadline) > new Date()).length,
        overdue: tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && !t.completed).length
    };
    const handleTaskClick = (task: any) => {
        setSelectedTask(task);
        setShowTaskDetail(true);
    };
    const handleEditTask = (task: any) => {
        setSelectedTask(task);
        setShowTaskDetail(false);
        setShowTaskForm(true);
    };
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'completed' ? task.completed : !task.completed);
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        const matchesCategory = filterCategory === 'all' || task.category === filterCategory;

        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
    // Get category color
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Học tập': return 'bg-green-500 border-green-600 text-white';
            case 'Phát triển bản thân': return 'bg-yellow-500 border-yellow-600 text-white';
            case 'Giải trí': return 'bg-purple-500 border-purple-600';
            case 'Gia đình': return 'bg-red-500 border-red-600';
            default: return 'bg-gray-500 border-gray-600';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'destructive';
            case 'medium': return 'default';
            case 'low': return 'secondary';
            default: return 'secondary';
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'high': return 'Cao';
            case 'medium': return 'Trung bình';
            case 'low': return 'Thấp';
            default: return 'Thấp';
        }
    };

    // Generate week days
    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        weekDays.push(date);
    }

    // Navigate weeks
    const goToCurrentWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(today);
        monday.setDate(today.getDate() + mondayOffset);
        monday.setHours(0, 0, 0, 0);
        setCurrentWeekStart(monday);
    };
    const goToPreviousWeek = () => {
        const newWeekStart = new Date(currentWeekStart);
        newWeekStart.setDate(currentWeekStart.getDate() - 7);
        setCurrentWeekStart(newWeekStart);
    };

    const goToNextWeek = () => {
        const newWeekStart = new Date(currentWeekStart);
        newWeekStart.setDate(currentWeekStart.getDate() + 7);
        setCurrentWeekStart(newWeekStart);
    };
    const formatWeekRange = () => {
        const endDate = new Date(currentWeekStart);
        endDate.setDate(currentWeekStart.getDate() + 6);

        return `${currentWeekStart.getDate()}/${currentWeekStart.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
    };
    // Generate time slots (24 hours)
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
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
            {showTaskForm && (
                <TaskForm
                    task={selectedTask}
                    onClose={() => {
                        setShowTaskForm(false);
                        setSelectedTask(null);
                    }}
                />
            )}

            {/* Task Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Tổng số</p>
                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{taskStats.total}</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-900 dark:text-green-100">Hoàn thành</p>
                                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{taskStats.completed}</p>
                            </div>
                            <Circle className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Đang làm</p>
                                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{taskStats.pending}</p>
                            </div>
                            <Clock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-900 dark:text-red-100">Quá hạn</p>
                                <p className="text-2xl font-bold text-red-900 dark:text-red-100">{taskStats.overdue}</p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Week Calendar */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center space-x-2">
                            <CalendarIcon className="h-5 w-5" />
                            <span>Tuần {formatWeekRange()}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                                <ChevronLeft className="h-4 w-4" />
                                Tuần trước
                            </Button>
                            <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
                                Tuần này
                            </Button>
                            <Button variant="outline" size="sm" onClick={goToNextWeek}>
                                Tuần sau
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Week Calendar Grid */}
                    <div className="grid grid-cols-8 gap-1 mb-4">
                        {/* Time column header */}
                        <div className="text-center font-medium text-sm text-gray-500 p-2">
                            Giờ
                        </div>

                        {/* Day headers */}
                        {weekDays.map((day, index) => (
                            <div key={index} className="text-center font-medium text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                <div className="text-gray-900 dark:text-white">
                                    {day.toLocaleDateString('vi-VN', { weekday: 'short' })}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {day.getDate()}/{day.getMonth() + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="max-h-96 overflow-y-auto border rounded-lg">
                        <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700">
                            {timeSlots.map((timeSlot) => (
                                <div key={timeSlot} className="contents">
                                    {/* Time label */}
                                    <div className="bg-gray-50 dark:bg-gray-800 p-2 text-xs text-gray-500 text-center border-r">
                                        {timeSlot}
                                    </div>

                                    {/* Day columns */}
                                    {weekDays.map((day, dayIndex) => {
                                        const dateKey = day.toDateString();
                                        const dayTasks = (allWeekTasks[dateKey] || []).filter(task => {
                                            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                task.description.toLowerCase().includes(searchTerm.toLowerCase());
                                            const matchesStatus = filterStatus === 'all' ||
                                                (filterStatus === 'completed' ? task.completed : !task.completed);
                                            const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
                                            const matchesCategory = filterCategory === 'all' || task.category === filterCategory;

                                            return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
                                        });
                                        const hour = parseInt(timeSlot.split(':')[0]);

                                        // Find tasks that overlap with this time slot
                                        const tasksInSlot = dayTasks.filter(task => {
                                            if (!task.startTime || !task.endTime) return false;
                                            const taskStartHour = parseInt(task.startTime.split(':')[0]);
                                            const taskEndHour = parseInt(task.endTime.split(':')[0]);
                                            return hour >= taskStartHour && hour < taskEndHour;
                                        });

                                        return (
                                            <div key={`${dateKey}-${timeSlot}`} className="bg-white dark:bg-gray-900 p-1 min-h-[40px] relative">
                                                {tasksInSlot.map((task) => (
                                                    <div
                                                        key={task.id}
                                                        onClick={() => handleTaskClick(task)}
                                                        className={`text-xs p-1 rounded cursor-pointer mb-1 border-l-2 ${getCategoryColor(task.category)} hover:opacity-80 transition-opacity shadow-sm`}
                                                        title={`${task.title} (${task.startTime} - ${task.endTime})`}
                                                    >
                                                        <div className="font-medium truncate text-white text-[10px] leading-tight">{task.title}</div>
                                                        <div className="text-[9px] opacity-90 text-white">{task.startTime}-{task.endTime}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-4 flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span>Học tập</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            <span>Phát triển bản thân</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded"></div>
                            <span>Giải trí</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded"></div>
                            <span>Gia đình</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Tìm kiếm nhiệm vụ..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className={showFilters ? 'bg-gray-100 dark:bg-gray-800' : ''}
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Bộ lọc
                        </Button>
                    </div>

                    {showFilters && (
                        <div className="mt-4 pt-4 border-t">
                            <TaskFilters
                                filterStatus={filterStatus}
                                setFilterStatus={setFilterStatus}
                                filterPriority={filterPriority}
                                setFilterPriority={setFilterPriority}
                                filterCategory={filterCategory}
                                setFilterCategory={setFilterCategory}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Search Results */}
            <Card>
                <CardHeader>
                    <CardTitle>Kết quả tìm kiếm</CardTitle>
                </CardHeader>
                <CardContent>
                    {filteredTasks.length > 0 ? (
                        <div className="max-h-64 overflow-y-auto space-y-2">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => handleTaskClick(task)}
                                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">{task.title}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{task.description}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge variant="outline" className="text-xs">
                                                    {task.category}
                                                </Badge>
                                                {task.deadline && (
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(task.deadline).toLocaleDateString('vi-VN')}
                                                    </span>
                                                )}
                                                {task.startTime && task.endTime && (
                                                    <span className="text-xs text-gray-500">
                                                        {task.startTime}-{task.endTime}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant={getPriorityColor(task.priority)}>
                                            {getPriorityText(task.priority)}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Không tìm thấy nhiệm vụ nào phù hợp với truy vấn.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Task Detail Modal */}
            {showTaskDetail && selectedTask && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Chi tiết nhiệm vụ
                            </h3>
                            <button
                                onClick={() => setShowTaskDetail(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                    {selectedTask.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {selectedTask.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Phân loại</span>
                                    <p className="font-medium">{selectedTask.category}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Độ ưu tiên</span>
                                    <p>
                                        <Badge variant={getPriorityColor(selectedTask.priority)}>
                                            {getPriorityText(selectedTask.priority)}
                                        </Badge>
                                    </p>
                                </div>
                            </div>

                            {selectedTask.startTime && selectedTask.endTime && (
                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Thời gian</span>
                                    <p className="font-medium flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {selectedTask.startTime} - {selectedTask.endTime}
                                    </p>
                                </div>
                            )}

                            {selectedTask.deadline && (
                                <div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Ngày hạn</span>
                                    <p className="font-medium">
                                        {new Date(selectedTask.deadline).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center space-x-2 pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleTask(selectedTask.id)}
                                >
                                    {selectedTask.completed ? (
                                        <>
                                            <Circle className="h-4 w-4 mr-1" />
                                            Đánh dấu chưa hoàn thành
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="h-4 w-4 mr-1" />
                                            Đánh dấu hoàn thành
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditTask(selectedTask)}
                                >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        deleteTask(selectedTask.id);
                                        setShowTaskDetail(false);
                                    }}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Xóa
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
