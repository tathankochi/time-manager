"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Gamepad2, Heart, User } from "lucide-react";
import { categoryIconMap } from "@/lib/analytics-utils";

interface CategoryData {
    category: string;
    count: number;
    icon: string;
}

interface CategoryDistributionProps {
    categoryData: CategoryData[];
}

export function CategoryDistribution({ categoryData }: CategoryDistributionProps) {
    const iconComponents = {
        'BookOpen': BookOpen,
        'User': User,
        'Gamepad2': Gamepad2,
        'Heart': Heart
    };

    return (
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
                        {categoryData.map((category) => {
                            const IconComponent = iconComponents[category.icon as keyof typeof iconComponents] || BookOpen;

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
    );
}
