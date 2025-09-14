"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Circle, Clock } from "lucide-react";
import { TaskStats } from "@/lib/task-helpers";

interface TaskStatisticsProps {
    stats: TaskStats;
}

export function TaskStatistics({ stats }: TaskStatisticsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Tổng số</p>
                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
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
                            <p className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.completed}</p>
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
                            <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{stats.pending}</p>
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
                            <p className="text-2xl font-bold text-red-900 dark:text-red-100">{stats.overdue}</p>
                        </div>
                        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
