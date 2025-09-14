"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { getUpcomingDeadlines, isDeadlineUrgent } from "@/lib/dashboard-utils";

interface UpcomingDeadlinesProps {
    tasks: any[];
    limit?: number;
}

export function UpcomingDeadlines({ tasks, limit = 3 }: UpcomingDeadlinesProps) {
    const upcomingDeadlines = getUpcomingDeadlines(tasks, limit);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg font-bold">
                    <AlertCircle className="h-5 w-5" />
                    <span>Deadline gần nhất</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {upcomingDeadlines.length > 0 ? (
                        upcomingDeadlines.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{task.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {task.category}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Badge
                                        variant={isDeadlineUrgent(task.deadline!) ? "destructive" : "secondary"}
                                    >
                                        {new Date(task.deadline!).toLocaleDateString('vi-VN')}
                                    </Badge>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                            Chưa có nhiệm vụ được phân bổ trong tương lai
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
