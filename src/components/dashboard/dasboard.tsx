"use client";

import { useUser } from "@/hooks/useUser";
import { AlertCircle, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useTask } from "@/lib/contexts/TaskContext";

export function Dashboard() {
  const { user } = useUser();
  const { tasks } = useTask();
  const [currentTime, setCurrentTime] = useState(new Date());
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
  const productivityScore = 90;
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
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
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
                          new Date(task.deadline!).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000
                            ? "destructive" : "secondary"
                        }>
                          {new Date(task.deadline!).toLocaleDateString('vi-VN')}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    Không có deadline gần nhất
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}