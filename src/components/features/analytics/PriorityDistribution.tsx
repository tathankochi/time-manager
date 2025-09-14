"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { getPriorityIconColor } from "@/lib/analytics-utils";

interface PriorityData {
    priority: string;
    label: string;
    count: number;
    icon: string;
}

interface PriorityDistributionProps {
    priorityData: PriorityData[];
}

export function PriorityDistribution({ priorityData }: PriorityDistributionProps) {
    const iconComponents = {
        'AlertTriangle': AlertTriangle,
        'AlertCircle': AlertCircle,
        'Info': Info
    };

    return (
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
                            const IconComponent = iconComponents[priority.icon as keyof typeof iconComponents] || Info;
                            const iconColor = getPriorityIconColor(priority.priority);

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
    );
}
