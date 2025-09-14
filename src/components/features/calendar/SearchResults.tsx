"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { getPriorityColor, getPriorityText } from "@/lib/task-helpers";

interface SearchResultsProps {
    filteredTasks: any[];
    onTaskClick: (task: any) => void;
}

export function SearchResults({ filteredTasks, onTaskClick }: SearchResultsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Kết quả tìm kiếm</CardTitle>
            </CardHeader>
            <CardContent>
                {filteredTasks.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto space-y-2">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                onClick={() => onTaskClick(task)}
                                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm">{task.title}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{task.description}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Badge variant="outline" className="text-xs">
                                                {task.category}
                                            </Badge>
                                            {task.deadline && (
                                                <span className="text-xs text-gray-500">
                                                    {new Date(task.deadline).toLocaleDateString('vi-VN')}
                                                </span>
                                            )}
                                            {task.startTime && task.endTime && (
                                                <span className="text-xs text-gray-500">
                                                    {task.startTime}-{task.endTime}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Badge variant={getPriorityColor(task.priority)}>
                                        {getPriorityText(task.priority)}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Không tìm thấy nhiệm vụ nào phù hợp với truy vấn.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
