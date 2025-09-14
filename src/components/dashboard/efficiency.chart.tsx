"use client";

import { useTask } from '@/lib/contexts/TaskContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function EfficiencyChart() {
    const { tasks } = useTask();

    // Tính efficiency score cho 7 ngày qua
    const getWeeklyEfficiencyData = () => {
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            date.setHours(0, 0, 0, 0); // Đặt về đầu ngày để so sánh chính xác

            // Lấy tasks của ngày đó (dựa trên deadline)
            const dayTasks = tasks.filter(task => {
                if (!task.deadline) return false;
                const taskDate = new Date(task.deadline);
                taskDate.setHours(0, 0, 0, 0); // Đặt về đầu ngày để so sánh chính xác
                return taskDate.getTime() === date.getTime();
            });

            // Tính efficiency score cho ngày đó
            let efficiencyScore = 0;
            if (dayTasks.length > 0) {
                // 1. Tính tỷ lệ hoàn thành tổng thể (dựa trên status)
                const completedTasks = dayTasks.filter(task => task.status === 'completed').length;
                const missedTasks = dayTasks.filter(task => task.status === 'miss').length;
                const totalProcessedTasks = completedTasks + missedTasks;

                let completionRate = 0;
                if (totalProcessedTasks > 0) {
                    completionRate = (completedTasks / totalProcessedTasks) * 100;
                }

                // 2. Tính tỷ lệ hoàn thành tasks quan trọng
                const importantTasks = dayTasks.filter(task =>
                    task.priority === 'high' || task.priority === 'medium'
                );
                const completedImportantTasks = importantTasks.filter(task => task.status === 'completed').length;
                const missedImportantTasks = importantTasks.filter(task => task.status === 'miss').length;
                const totalProcessedImportantTasks = completedImportantTasks + missedImportantTasks;

                let importantCompletionRate = 0;
                if (totalProcessedImportantTasks > 0) {
                    importantCompletionRate = (completedImportantTasks / totalProcessedImportantTasks) * 100;
                } else if (importantTasks.length === 0) {
                    // Nếu không có task quan trọng, coi như 100%
                    importantCompletionRate = 100;
                }

                // 3. Công thức tổng hợp
                efficiencyScore = Math.round((completionRate * 0.6) + (importantCompletionRate * 0.4));
            }

            // Format ngày tháng: DD/MM
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');

            data.push({
                day: `${day}/${month}`,
                efficiency: efficiencyScore
            });
        }

        return data;
    };

    const data = getWeeklyEfficiencyData();

    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
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
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value: any) => [`${value}%`, 'Năng suất']}
                    />
                    <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}