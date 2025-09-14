"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import {
    calculateAllocatedTime,
    formatAllocatedTime,
    calculateTodayCompletionRate,
    getProductivityDescription
} from "@/lib/dashboard-utils";

interface StatsOverviewProps {
    todayTasks: any[];
    productivityScore: number;
    completedTasks: number;
}

export function StatsOverview({ todayTasks, productivityScore, completedTasks }: StatsOverviewProps) {
    const completionStats = calculateTodayCompletionRate(todayTasks);
    const allocatedTimeMinutes = calculateAllocatedTime(todayTasks);
    const formattedTime = formatAllocatedTime(allocatedTimeMinutes);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Today's Tasks Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Nhiệm vụ hôm nay
                    </CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {completionStats.completed}/{completionStats.total}
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        {completionStats.total > 0
                            ? `${completionStats.percentage}% hoàn thành`
                            : 'Không có nhiệm vụ nào'
                        }
                    </p>
                    <Progress
                        value={completionStats.percentage}
                        className="mt-2"
                    />
                </CardContent>
            </Card>

            {/* Productivity Score Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100">
                        Điểm năng suất trong 7 ngày vừa qua
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                        {productivityScore}%
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                        {getProductivityDescription(productivityScore)}
                    </p>
                </CardContent>
            </Card>

            {/* Completed Tasks Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                        Nhiệm vụ hoàn thành trong 7 ngày vừa qua
                    </CardTitle>
                    <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {completedTasks}
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                        Nhiệm vụ đã hoàn thành
                    </p>
                </CardContent>
            </Card>

            {/* Allocated Time Card */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
                        Thời gian được phân bổ hôm nay
                    </CardTitle>
                    <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                        {formattedTime}
                    </div>
                    <p className="text-xs text-green-700 dark:text-green-300">
                        Đã được phân bổ
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
