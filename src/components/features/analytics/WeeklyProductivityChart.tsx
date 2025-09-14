"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getTooltipConfig, getBarConfig } from "@/lib/analytics-utils";

interface WeeklyProductivityChartProps {
    weeklyData: any[];
}

export function WeeklyProductivityChart({ weeklyData }: WeeklyProductivityChartProps) {
    return (
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
                                <Tooltip {...getTooltipConfig()} />
                                <Bar {...getBarConfig()} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
