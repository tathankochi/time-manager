"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { TodayTask } from "./today.task";
import { ImportantTask } from "./important.task";
import { EfficiencyChart } from "./efficiency.chart";
import {
  WelcomeHeader,
  StatsOverview,
  UpcomingDeadlines
} from "@/components/features/dashboard";

export function Dashboard() {
  const {
    userName,
    currentTime,
    tasks,
    todayTasks,
    productivityScore,
    completedTasks
  } = useDashboard();
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <WelcomeHeader
        userName={userName}
        currentTime={currentTime}
        productivityScore={productivityScore}
      />

      {/* Stats Overview */}
      <StatsOverview
        todayTasks={todayTasks}
        productivityScore={productivityScore}
        completedTasks={completedTasks}
      />
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Lịch trình hôm nay</span>
              </CardTitle>
              <CardDescription>
                Tổng quan thời gian biểu và nhiệm vụ trong ngày
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TodayTask />
            </CardContent>
          </Card>

          {/* Productivity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Biểu đồ hiệu suất</span>
              </CardTitle>
              <CardDescription>
                Hiệu suất nhiệm vụ trong 7 ngày gần nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EfficiencyChart />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <UpcomingDeadlines tasks={tasks} />

          {/* Important Tasks */}
          <ImportantTask />
        </div>
      </div>
    </div>
  );
}