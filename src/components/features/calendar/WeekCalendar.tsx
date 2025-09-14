"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { generateWeekDays, generateTimeSlots, formatWeekRange, isTaskInTimeSlot } from "@/lib/calendar-utils";
import { getCategoryColor, getStatusColor, getStatusIcon } from "@/lib/task-helpers";

interface WeekCalendarProps {
    currentWeekStart: Date;
    allWeekTasks: Record<string, any[]>;
    onPreviousWeek: () => void;
    onNextWeek: () => void;
    onCurrentWeek: () => void;
    onTaskClick: (task: any) => void;
}

export function WeekCalendar({
    currentWeekStart,
    allWeekTasks,
    onPreviousWeek,
    onNextWeek,
    onCurrentWeek,
    onTaskClick
}: WeekCalendarProps) {
    const weekDays = generateWeekDays(currentWeekStart);
    const timeSlots = generateTimeSlots();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5" />
                        <span>Tuần {formatWeekRange(currentWeekStart)}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={onPreviousWeek}>
                            <ChevronLeft className="h-4 w-4" />
                            Tuần trước
                        </Button>
                        <Button variant="outline" size="sm" onClick={onCurrentWeek}>
                            Tuần này
                        </Button>
                        <Button variant="outline" size="sm" onClick={onNextWeek}>
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
                                    const dayTasks = allWeekTasks[dateKey] || [];
                                    const hour = parseInt(timeSlot.split(':')[0]);

                                    // Find tasks that overlap with this time slot
                                    const tasksInSlot = dayTasks.filter(task => isTaskInTimeSlot(task, hour));

                                    return (
                                        <div key={`${dateKey}-${timeSlot}`} className="bg-white dark:bg-gray-900 p-1 min-h-[40px] relative">
                                            {tasksInSlot.map((task) => (
                                                <div
                                                    key={task.id}
                                                    onClick={() => onTaskClick(task)}
                                                    className={`text-xs p-1 rounded cursor-pointer mb-1 border-l-2 ${getCategoryColor(task.category)} hover:opacity-80 transition-opacity shadow-sm`}
                                                    title={`${task.title}${task.startTime && task.endTime ? ` (${task.startTime} - ${task.endTime})` : ''} - ${task.status === 'completed' ? 'Hoàn thành' : task.status === 'miss' ? 'Bỏ lỡ' : 'Chưa làm'}`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="font-medium truncate text-white text-[10px] leading-tight">{task.title}</div>
                                                            {task.startTime && task.endTime && (
                                                                <div className="text-[9px] opacity-90 text-white">{task.startTime}-{task.endTime}</div>
                                                            )}
                                                        </div>
                                                        <div className={`ml-1 px-1 rounded text-[8px] ${getStatusColor(task.status)}`}>
                                                            {getStatusIcon(task.status)}
                                                        </div>
                                                    </div>
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
                <div className="mt-4 space-y-3">
                    {/* Category Legend */}
                    <div className="flex items-center space-x-6 text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Phân loại:</span>
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

                    {/* Status Legend */}
                    <div className="flex items-center space-x-6 text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Trạng thái:</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded flex items-center justify-center">
                                <span className="text-green-800 text-xs">✓</span>
                            </div>
                            <span>Hoàn thành</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded flex items-center justify-center">
                                <span className="text-red-800 text-xs">✗</span>
                            </div>
                            <span>Bỏ lỡ</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded flex items-center justify-center">
                                <span className="text-yellow-800 text-xs">○</span>
                            </div>
                            <span>Chưa làm</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
