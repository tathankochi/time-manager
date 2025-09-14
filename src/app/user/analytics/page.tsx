"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import {
    KeyMetrics,
    WeeklyProductivityChart,
    CategoryDistribution,
    PriorityDistribution,
    MotivationalQuote
} from "@/components/features/analytics";

export default function AnalyticsPage() {
    const {
        productivityScore,
        completedTasks,
        completedFocusSessions,
        totalTasks,
        trend,
        weeklyData,
        updatedCategoryData,
        priorityData,
        randomQuote
    } = useAnalytics();

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
            <KeyMetrics
                productivityScore={productivityScore}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
                completedFocusSessions={completedFocusSessions.length}
                trend={trend}
            />

            {/* Main Analytics Section */}
            <div className="grid grid-cols-7 gap-6 items-stretch">
                {/* Weekly Productivity Chart */}
                <WeeklyProductivityChart weeklyData={weeklyData} />

                {/* Category Distribution */}
                <CategoryDistribution categoryData={updatedCategoryData} />

                {/* Priority Distribution */}
                <PriorityDistribution priorityData={priorityData} />
            </div>

            {/* Motivational Quote */}
            <MotivationalQuote quote={randomQuote} />
        </div>
    );
}
