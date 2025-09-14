"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Zap, CheckCircle, Clock, Target, BookOpen, User, Gamepad2, Heart, AlertTriangle, AlertCircle, Info, BarChart3, Star, Trophy, Flame, Sparkles, Quote } from "lucide-react";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AnalyticsPage() {
    const {
        productivityScore,
        completedTasks,
        todayTasks,
        pomodoroStats,
        completedFocusSessions,
        totalTasks,
        completionRate,
        trend,
        weeklyData,
        updatedCategoryData,
        priorityData
    } = useAnalyticsData();

    // Icon mapping cho priority
    const priorityIconMap = {
        'AlertTriangle': AlertTriangle,
        'AlertCircle': AlertCircle,
        'Info': Info
    };

    // Icon mapping cho category
    const categoryIconMap = {
        'BookOpen': BookOpen,
        'User': User,
        'Gamepad2': Gamepad2,
        'Heart': Heart
    };

    // Danh sách câu động lực
    const motivationalQuotes = [
        "Từng bước nhỏ hôm nay dẫn bạn đến những đỉnh cao ngày mai.",
        "Không có thất bại, chỉ có bài học.",
        "Hành động là chìa khóa mở ra mọi cơ hội.",
        "Tin vào bản thân, bạn có thể làm được mọi thứ.",
        "Mỗi ngày là một cơ hội để bắt đầu lại.",
        "Kiên trì biến giấc mơ thành hiện thực.",
        "Thành công không đến từ may mắn, mà từ nỗ lực.",
        "Đừng chờ đợi thời điểm hoàn hảo, hãy bắt đầu ngay bây giờ.",
        "Bạn mạnh mẽ hơn những thử thách bạn đối mặt.",
        "Mỗi khó khăn là một cơ hội để trưởng thành.",
        "Hãy là phiên bản tốt nhất của chính mình.",
        "Không gì là không thể khi bạn quyết tâm.",
        "Hôm nay là ngày để bạn tỏa sáng.",
        "Từng nỗ lực nhỏ sẽ dẫn bạn đến những thành công lớn.",
        "Đừng sợ thất bại, hãy sợ việc không cố gắng."
    ];

    // State để lưu câu động lực đã chọn
    const [randomQuote, setRandomQuote] = useState("");

    // Chọn câu động lực ngẫu nhiên chỉ 1 lần khi component mount
    useEffect(() => {
        const selectedQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setRandomQuote(selectedQuote);
    }, []); // Empty dependency array để chỉ chạy 1 lần

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Phân tích & Báo cáo</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Theo dõi tiến độ học tập và hiệu suất cá nhân
                    </p>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Productivity Score */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Điểm năng suất</p>
                                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{productivityScore}%</p>
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    Xu hướng {trend}
                                </p>
                            </div>
                            <div className="bg-blue-600 p-3 rounded-full">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tasks Completed */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-900 dark:text-green-100">Tasks hoàn thành</p>
                                <p className="text-3xl font-bold text-green-900 dark:text-green-100">{completedTasks}/{totalTasks}</p>
                                <p className="text-xs text-green-700 dark:text-green-300">
                                    {completionRate}% nhiệm vụ)
                                </p>
                            </div>
                            <div className="bg-green-600 p-3 rounded-full">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pomodoro Sessions */}
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Phiên tập trung đã hoàn thành</p>
                                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{completedFocusSessions.length}</p>
                            </div>
                            <div className="bg-orange-600 p-3 rounded-full">
                                <Clock className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main section - 7 phần: Chart 3 phần, 2 Cards mỗi card 2 phần */}
            <div className="grid grid-cols-7 gap-6 items-stretch">
                {/* Weekly Productivity Chart - 3 phần */}
                <div className="col-span-7 lg:col-span-3">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BarChart3 className="h-5 w-5" />
                                <span>Hiệu suất theo ngày</span>
                            </CardTitle>
                            <CardDescription>
                                Theo dõi hiệu suất học tập trong 7 ngày gần nhất
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis
                                            dataKey="day"
                                            stroke="#6b7280"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="#6b7280"
                                            fontSize={12}
                                            domain={[0, 100]}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                            formatter={(value) => [`${value}%`, 'Năng suất']}
                                        />
                                        <Bar
                                            dataKey="productivity"
                                            fill="#3B82F6"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Subject Distribution - 2 phần */}
                <div className="col-span-7 lg:col-span-2">
                    <Card className="h-full flex flex-col">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center space-x-2 text-lg">
                                <BookOpen className="h-5 w-5" />
                                <span>Phân bố nhiệm vụ theo loại</span>
                            </CardTitle>
                            <CardDescription>
                                Tổng quan về các nhiệm vụ theo loại
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                            <div className="space-y-4 flex-1">
                                {updatedCategoryData.map((category, index) => {
                                    const IconComponent = categoryIconMap[category.icon as keyof typeof categoryIconMap];
                                    return (
                                        <div key={category.category} className="flex items-center justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                                <span className="text-sm font-medium">{category.category}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-bold">{category.count}</span>
                                                <span className="text-xs text-gray-500 ml-1">nhiệm vụ</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Priority Distribution - 2 phần */}
                <div className="col-span-7 lg:col-span-2">
                    <Card className="h-full flex flex-col">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center space-x-2 text-lg">
                                <AlertTriangle className="h-5 w-5" />
                                <span>Phân bố nhiệm vụ theo mức độ</span>
                            </CardTitle>
                            <CardDescription>
                                Tổng quan về các nhiệm vụ theo mức độ ưu tiên
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                            <div className="space-y-4 flex-1">
                                {priorityData.map((priority) => {
                                    const IconComponent = priorityIconMap[priority.icon as keyof typeof priorityIconMap];
                                    let iconColor = "text-gray-600 dark:text-gray-400";

                                    // Màu sắc phù hợp cho từng mức độ ưu tiên
                                    switch (priority.priority) {
                                        case 'high':
                                            iconColor = "text-red-500 dark:text-red-400";
                                            break;
                                        case 'medium':
                                            iconColor = "text-yellow-500 dark:text-yellow-400";
                                            break;
                                        case 'low':
                                            iconColor = "text-green-500 dark:text-green-400";
                                            break;
                                        default:
                                            iconColor = "text-gray-600 dark:text-gray-400";
                                    }

                                    return (
                                        <div key={priority.priority} className="flex items-center justify-between py-2">
                                            <div className="flex items-center space-x-3">
                                                <IconComponent className={`h-5 w-5 ${iconColor}`} />
                                                <span className="text-sm font-medium">{priority.label}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-bold">{priority.count}</span>
                                                <span className="text-xs text-gray-500 ml-1">nhiệm vụ</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Motivation Section */}
            <div className="mt-8">
                <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32"></div>
                        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16"></div>
                    </div>

                    <CardContent className="p-8 relative z-10">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                    <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed text-slate-700 dark:text-slate-300 italic">
                                    {randomQuote ? `"${randomQuote}"` : "Đang tải câu động lực..."}
                                </blockquote>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
