"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useTask } from '@/lib/contexts/TaskContext';

export function ImportantTask() {
    const { getImportantTasks, toggleTask } = useTask();

    const importantTasks = getImportantTasks();

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'destructive';
            case 'medium': return 'default';
            case 'low': return 'secondary';
            default: return 'secondary';
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'high': return 'Cao';
            case 'medium': return 'Trung bình';
            case 'low': return 'Thấp';
            default: return 'Thấp';
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2 text-lg font-bold">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Quan trọng</span>
                </CardTitle>
                <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {importantTasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className={`rounded-full p-1 transition-colors ${task.status === 'completed'
                                        ? 'text-green-600 bg-green-100 dark:bg-green-900/20'
                                        : 'text-gray-400 hover:text-green-600'
                                        }`}
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                </button>
                                <div>
                                    <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''
                                        }`}>
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {task.category}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Badge variant={getPriorityColor(task.priority)}>
                                    {getPriorityText(task.priority)}
                                </Badge>
                                {task.deadline && (
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {new Date(task.deadline).toLocaleDateString('vi-VN')}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {importantTasks.length === 0 && (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            <p className="text-sm">Không có nhiệm vụ độ ưu tiên cao nào</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}