"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';

// Định nghĩa kiểu dữ liệu Task
export interface Task {
    id: string;
    userId: string; // Liên kết với user
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'completed';
    deadline?: string;
    startTime?: string; // HH:MM format
    endTime?: string;   // HH:MM format
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Định nghĩa kiểu dữ liệu Pomodoro Session
export interface PomodoroSession {
    id: string;
    userId: string;
    type: 'focus' | 'shortBreak' | 'longBreak';
    duration: number; // in minutes
    completedAt: Date;
    taskId?: string; // Optional: link to specific task
}

// Định nghĩa kiểu cho Context
export interface TaskState {
    tasks: Task[];
    pomodoroSessions: PomodoroSession[];
    currentUserId: string | null;
    addTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
    updateTaskStatus: (id: string) => void;
    getTodayTasks: () => Task[];
    getCompletedTasksCount: () => number;
    getTasksByCategory: (category: string) => Task[];
    getImportantTasks: () => Task[];
    checkTimeConflict: (date: string, startTime: string, endTime: string, excludeTaskId?: string) => Task | null;
    getTasksForWeek: (startDate: Date) => { [key: string]: Task[] };
    calculateProductivityScore: () => number;
    addPomodoroSession: (type: 'focus' | 'shortBreak' | 'longBreak', duration: number, taskId?: string) => void;
    getTodayPomodoroSessions: () => PomodoroSession[];
    getPomodoroStats: () => { totalSessions: number; focusSessions: number; breakSessions: number };
    setCurrentUserId: (userId: string | null) => void;
}

// Tạo Context
const TaskContext = createContext<TaskState | undefined>(undefined);

// Props cho Provider
interface TaskProviderProps {
    children: ReactNode;
}

// Provider Component
export function TaskProvider({ children }: TaskProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [pomodoroSessions, setPomodoroSessions] = useState<PomodoroSession[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();

    // Tải tasks và pomodoro sessions từ localStorage khi component mount
    useEffect(() => {
        loadTasksFromStorage();
        loadPomodoroSessionsFromStorage();
    }, []);

    // Đồng bộ currentUserId với user hiện tại
    useEffect(() => {
        if (user?.email) {
            setCurrentUserId(user.email);
        } else {
            setCurrentUserId(null);
        }
    }, [user]);

    // Lưu tasks và pomodoro sessions vào localStorage mỗi khi thay đổi
    useEffect(() => {
        if (!isLoading) {
            saveTasksToStorage();
            savePomodoroSessionsToStorage();
        }
    }, [tasks, pomodoroSessions, isLoading]);

    // Hàm tải tasks từ localStorage
    const loadTasksFromStorage = () => {
        try {
            if (typeof window !== 'undefined') {
                const tasksKey = "tm_tasks";
                const storedTasks = localStorage.getItem(tasksKey);

                if (storedTasks) {
                    const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
                        ...task,
                        createdAt: new Date(task.createdAt),
                        updatedAt: new Date(task.updatedAt)
                    }));
                    setTasks(parsedTasks);
                }
            }
        } catch (error) {
            console.error('Lỗi khi tải tasks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Hàm lưu tasks vào localStorage
    const saveTasksToStorage = () => {
        try {
            if (typeof window !== 'undefined') {
                const tasksKey = "tm_tasks";
                localStorage.setItem(tasksKey, JSON.stringify(tasks));
            }
        } catch (error) {
            console.error('Lỗi khi lưu tasks:', error);
        }
    };

    // Lấy tasks của user hiện tại
    const getUserTasks = (): Task[] => {
        if (!currentUserId) return [];
        return tasks.filter(task => task.userId === currentUserId);
    };

    // Tạo ID duy nhất cho task
    const generateId = (): string => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    // Thêm task mới
    const addTask = (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
        if (!currentUserId) {
            console.error('Không thể thêm task: chưa đăng nhập');
            return;
        }

        const now = new Date();
        const newTask: Task = {
            ...taskData,
            id: generateId(),
            userId: currentUserId,
            createdAt: now,
            updatedAt: now
        };

        setTasks(prev => [...prev, newTask]);
    };

    // Cập nhật task
    const updateTask = (id: string, updates: Partial<Task>) => {
        if (!currentUserId) {
            console.error('Không thể cập nhật task: chưa đăng nhập');
            return;
        }

        setTasks(prev => prev.map(task =>
            task.id === id && task.userId === currentUserId
                ? { ...task, ...updates, updatedAt: new Date() }
                : task
        ));
    };

    // Xóa task
    const deleteTask = (id: string) => {
        if (!currentUserId) {
            console.error('Không thể xóa task: chưa đăng nhập');
            return;
        }

        setTasks(prev => prev.filter(task => !(task.id === id && task.userId === currentUserId)));
    };

    // Toggle trạng thái completed
    const toggleTask = (id: string) => {
        if (!currentUserId) {
            console.error('Không thể toggle task: chưa đăng nhập');
            return;
        }

        setTasks(prev => prev.map(task =>
            task.id === id && task.userId === currentUserId
                ? {
                    ...task,
                    completed: !task.completed,
                    status: !task.completed ? 'completed' : 'todo',
                    updatedAt: new Date()
                }
                : task
        ));
    };

    // Cập nhật status của task (todo -> in-progress -> completed)
    const updateTaskStatus = (id: string) => {
        if (!currentUserId) {
            console.error('Không thể cập nhật status: chưa đăng nhập');
            return;
        }

        setTasks(prev => prev.map(task => {
            if (task.id === id && task.userId === currentUserId) {
                let newStatus: 'todo' | 'in-progress' | 'completed';
                let newCompleted: boolean;

                switch (task.status) {
                    case 'todo':
                        newStatus = 'in-progress';
                        newCompleted = false;
                        break;
                    case 'in-progress':
                        newStatus = 'completed';
                        newCompleted = true;
                        break;
                    case 'completed':
                        newStatus = 'todo';
                        newCompleted = false;
                        break;
                    default:
                        newStatus = 'todo';
                        newCompleted = false;
                }

                return {
                    ...task,
                    status: newStatus,
                    completed: newCompleted,
                    updatedAt: new Date()
                };
            }
            return task;
        }));
    };

    // Lấy tasks của ngày hôm nay
    const getTodayTasks = (): Task[] => {
        if (!currentUserId) return [];
        const today = new Date().toDateString();
        return getUserTasks().filter(task => {
            if (!task.deadline) return false;
            const taskDate = new Date(task.deadline).toDateString();
            return taskDate === today;
        });
    };

    // Đếm số tasks đã hoàn thành
    const getCompletedTasksCount = (): number => {
        if (!currentUserId) return 0;
        return getUserTasks().filter(task => task.completed).length;
    };

    // Lấy tasks theo category
    const getTasksByCategory = (category: string): Task[] => {
        if (!currentUserId) return [];
        return getUserTasks().filter(task => task.category === category);
    };

    // Lấy tasks quan trọng (priority high hoặc medium)
    const getImportantTasks = (): Task[] => {
        if (!currentUserId) return [];
        return getUserTasks().filter(task =>
            task.priority === 'high'
        );
    };

    // Kiểm tra xung đột thời gian
    const checkTimeConflict = (
        date: string,
        startTime: string,
        endTime: string,
        excludeTaskId?: string
    ): Task | null => {
        if (!currentUserId) return null;

        const targetDate = new Date(date).toDateString();

        return getUserTasks().find(task => {
            if (task.id === excludeTaskId) return false;
            if (!task.deadline || !task.startTime || !task.endTime) return false;

            const taskDate = new Date(task.deadline).toDateString();
            if (taskDate !== targetDate) return false;

            // Chuyển đổi thời gian thành phút để so sánh
            const parseTime = (time: string) => {
                const [hours, minutes] = time.split(':').map(Number);
                return hours * 60 + minutes;
            };

            const targetStart = parseTime(startTime);
            const targetEnd = parseTime(endTime);
            const taskStart = parseTime(task.startTime);
            const taskEnd = parseTime(task.endTime);

            // Kiểm tra xung đột: (start1 < end2) && (start2 < end1)
            return (targetStart < taskEnd) && (taskStart < targetEnd);
        }) || null;
    };

    // Lấy tasks cho tuần
    const getTasksForWeek = (startDate: Date): { [key: string]: Task[] } => {
        if (!currentUserId) return {};

        const weekTasks: { [key: string]: Task[] } = {};
        const userTasks = getUserTasks();

        // Tạo 7 ngày từ startDate
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dateString = date.toDateString();

            weekTasks[dateString] = userTasks.filter(task => {
                if (!task.deadline) return false;
                const taskDate = new Date(task.deadline).toDateString();
                return taskDate === dateString;
            });
        }

        return weekTasks;
    };

    // Hàm tải pomodoro sessions từ localStorage
    const loadPomodoroSessionsFromStorage = () => {
        try {
            if (typeof window !== 'undefined') {
                const sessionsKey = "tm_pomodoro_sessions";
                const storedSessions = localStorage.getItem(sessionsKey);

                if (storedSessions) {
                    const parsedSessions = JSON.parse(storedSessions).map((session: any) => ({
                        ...session,
                        completedAt: new Date(session.completedAt)
                    }));
                    setPomodoroSessions(parsedSessions);
                }
            }
        } catch (error) {
            console.error('Lỗi khi tải pomodoro sessions:', error);
        }
    };

    // Hàm lưu pomodoro sessions vào localStorage
    const savePomodoroSessionsToStorage = () => {
        try {
            if (typeof window !== 'undefined') {
                const sessionsKey = "tm_pomodoro_sessions";
                localStorage.setItem(sessionsKey, JSON.stringify(pomodoroSessions));
            }
        } catch (error) {
            console.error('Lỗi khi lưu pomodoro sessions:', error);
        }
    };

    // Lấy pomodoro sessions của user hiện tại
    const getUserPomodoroSessions = (): PomodoroSession[] => {
        if (!currentUserId) return [];
        return pomodoroSessions.filter(session => session.userId === currentUserId);
    };

    // Thêm pomodoro session mới
    const addPomodoroSession = (type: 'focus' | 'shortBreak' | 'longBreak', duration: number, taskId?: string) => {
        if (!currentUserId) {
            console.error('Không thể thêm pomodoro session: chưa đăng nhập');
            return;
        }

        const newSession: PomodoroSession = {
            id: generateId(),
            userId: currentUserId,
            type,
            duration,
            completedAt: new Date(),
            taskId
        };

        setPomodoroSessions(prev => [...prev, newSession]);
    };

    // Lấy pomodoro sessions của hôm nay
    const getTodayPomodoroSessions = (): PomodoroSession[] => {
        if (!currentUserId) return [];
        const today = new Date().toDateString();
        return getUserPomodoroSessions().filter(session => {
            const sessionDate = session.completedAt.toDateString();
            return sessionDate === today;
        });
    };

    // Lấy thống kê pomodoro
    const getPomodoroStats = () => {
        const userSessions = getUserPomodoroSessions();
        const totalSessions = userSessions.length;
        const focusSessions = userSessions.filter(session => session.type === 'focus').length;
        const breakSessions = userSessions.filter(session =>
            session.type === 'shortBreak' || session.type === 'longBreak'
        ).length;

        return {
            totalSessions,
            focusSessions,
            breakSessions
        };
    };

    // Tính điểm năng suất dựa trên các yếu tố
    const calculateProductivityScore = (): number => {
        if (!currentUserId) return 0;

        const userTasks = getUserTasks();
        if (userTasks.length === 0) return 0;

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Lọc tasks trong 7 ngày qua
        const recentTasks = userTasks.filter(task =>
            task.createdAt >= oneWeekAgo ||
            (task.deadline && new Date(task.deadline) >= oneWeekAgo)
        );

        if (recentTasks.length === 0) return 0;

        // 1. Tỷ lệ hoàn thành task (60%)
        const completedTasks = recentTasks.filter(task => task.completed);
        const completionRate = (completedTasks.length / recentTasks.length) * 100;

        // 2. Tỷ lệ task quan trọng hoàn thành (25%)
        const importantTasks = recentTasks.filter(task =>
            task.priority === 'high' || task.priority === 'medium'
        );
        const completedImportantTasks = importantTasks.filter(task => task.completed);
        const importantCompletionRate = importantTasks.length > 0 ?
            (completedImportantTasks.length / importantTasks.length) * 100 : 100;

        // 3. Tần suất hoạt động (15%) - dựa trên số ngày có task trong tuần
        const activeDays = new Set();
        recentTasks.forEach(task => {
            if (task.createdAt) {
                activeDays.add(task.createdAt.toDateString());
            }
            if (task.updatedAt) {
                activeDays.add(task.updatedAt.toDateString());
            }
        });
        const activityRate = (activeDays.size / 7) * 100;

        // Tính điểm tổng hợp với trọng số
        const productivityScore =
            (completionRate * 0.6) +
            (importantCompletionRate * 0.25) +
            (activityRate * 0.15);

        // Làm tròn và giới hạn trong khoảng 0-100
        return Math.min(100, Math.max(0, Math.round(productivityScore)));
    };

    // Giá trị context
    const value: TaskState = {
        tasks: getUserTasks(),
        pomodoroSessions: getUserPomodoroSessions(),
        currentUserId,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        updateTaskStatus,
        getTodayTasks,
        getCompletedTasksCount,
        getTasksByCategory,
        getImportantTasks,
        checkTimeConflict,
        getTasksForWeek,
        calculateProductivityScore,
        addPomodoroSession,
        getTodayPomodoroSessions,
        getPomodoroStats,
        setCurrentUserId
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}

// Custom hook để sử dụng TaskContext
export function useTask() {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error('useTask must be used within a TaskProvider');
    }

    return context;
}
