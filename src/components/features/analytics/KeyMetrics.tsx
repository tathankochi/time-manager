"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Zap } from "lucide-react";
import { getProductivityDescription, getProductivityTrend } from "@/lib/analytics-utils";

interface KeyMetricsProps {
    productivityScore: number;
    completedTasks: number;
    totalTasks: number;
    completedFocusSessions: number;
    trend: string;
}

export function KeyMetrics({
    productivityScore,
    completedTasks,
    totalTasks,
    completedFocusSessions,
    trend
}: KeyMetricsProps) {
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
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
                                {completionRate}% nhiệm vụ
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
                            <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{completedFocusSessions}</p>
                        </div>
                        <div className="bg-orange-600 p-3 rounded-full">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
