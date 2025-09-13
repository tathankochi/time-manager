"use client";

import { useUser } from "@/hooks/useUser";
import { AlertCircle, Award, Brain, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useTask } from "@/lib/contexts/TaskContext";
import { Progress } from "../ui/progress";
import { TodayTask } from "./today.task";
import { ImportantTask } from "./important.task";
import { EfficiencyChart, ProductivityChart } from "./efficiency.chart";

export function Dashboard() {
  const { user } = useUser();
  const { tasks, getTodayTasks, calculateProductivityScore } = useTask();
  const [currentTime, setCurrentTime] = useState(new Date());
  const todayTasks = getTodayTasks();
  const productivityScore = calculateProductivityScore();
  // Lấy số nhiệm vụ đã hoàn thành trong 7 ngày qua
  const oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  const completedTasks = tasks.filter(task =>
    task.completed &&
    task.updatedAt >= oneWeekAgo
  ).length;

  // Tính tổng thời gian được phân bổ trong hôm nay
  const todayAllocatedTime = todayTasks
    .filter(task => task.startTime && task.endTime)
    .reduce((total, task) => {
      const startTime = task.startTime!.split(':');
      const endTime = task.endTime!.split(':');
      const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
      const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
      const durationMinutes = endMinutes - startMinutes;
      return total + durationMinutes;
    }, 0);

  // Chuyển đổi từ phút sang giờ và phút
  const todayAllocatedHours = Math.floor(todayAllocatedTime / 60);
  const todayAllocatedMinutes = todayAllocatedTime % 60;

  // Format hiển thị: "Xh Ym" hoặc chỉ "Xh" nếu phút = 0
  const formatTime = () => {
    if (todayAllocatedMinutes === 0) {
      return `${todayAllocatedHours}h`;
    }
    return `${todayAllocatedHours}h ${todayAllocatedMinutes}m`;
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  const formatVietnameseTime = (date: Date) => {
    return date.toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const upcomingDeadlines = tasks
    .filter(task => !task.completed && task.deadline)
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
    .slice(0, 3);
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Xin chào {user?.fullName}!</h1>
            <p className="text-blue-100">
              Hôm nay là {formatVietnameseTime(currentTime).split(',')[0]}, {formatVietnameseTime(currentTime).split(',')[1]}
            </p>
            {/* <p className="text-blue-100 mt-1">
              Bạn có {todayTasks.length} nhiệm vụ cần hoàn thành trong hôm nay
            </p> */}
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-3">
              <Brain className="h-8 w-8 mb-2" />
              <p className="text-sm">Điểm năng suất</p>
              <p className="text-2xl font-bold">{productivityScore}%</p>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Nhiệm vụ hôm nay
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {todayTasks.filter(t => t.completed).length}/{todayTasks.length}
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {todayTasks.length > 0 ?
                `${Math.round((todayTasks.filter(t => t.completed).length / todayTasks.length) * 100)}% hoàn thành` :
                'Không có nhiệm vụ nào'
              }
            </p>
            <Progress
              value={todayTasks.length > 0 ? (todayTasks.filter(t => t.completed).length / todayTasks.length) * 100 : 0}
              className="mt-2"
            />
          </CardContent>
        </Card>
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
              {productivityScore >= 80 ? 'Xuất sắc!' :
                productivityScore >= 60 ? 'Tốt' : 'Cần cải thiện'}
            </p>
          </CardContent>
        </Card>
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
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
              Thời gian được phân bổ hôm nay
            </CardTitle>
            <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {formatTime()}
            </div>
            <p className="text-xs text-green-700 dark:text-green-300">
              Đã được phân bổ
            </p>
          </CardContent>
        </Card>
      </div>
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
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {task.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          new Date(task.deadline!).getTime() - new Date().getTime() < 2 * 24 * 60 * 60 * 1000
                            ? "destructive" : "secondary"
                        }>
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
          <ImportantTask />
        </div>
      </div>
    </div>
  );
}