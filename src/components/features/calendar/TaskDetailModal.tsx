"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Edit, Trash2 } from "lucide-react";
import { getPriorityColor, getPriorityText } from "@/lib/task-helpers";

interface TaskDetailModalProps {
    task: any;
    onClose: () => void;
    onEdit: (task: any) => void;
    onDelete: (taskId: string) => void;
    onStatusChange: (taskId: string, status: 'todo' | 'miss' | 'completed') => void;
}

export function TaskDetailModal({
    task,
    onClose,
    onEdit,
    onDelete,
    onStatusChange
}: TaskDetailModalProps) {
    if (!task) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Chi tiết nhiệm vụ
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            {task.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {task.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Phân loại</span>
                            <p className="font-medium">{task.category}</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Độ ưu tiên</span>
                            <p>
                                <Badge variant={getPriorityColor(task.priority)}>
                                    {getPriorityText(task.priority)}
                                </Badge>
                            </p>
                        </div>
                    </div>

                    {task.startTime && task.endTime && (
                        <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Thời gian</span>
                            <p className="font-medium flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {task.startTime} - {task.endTime}
                            </p>
                        </div>
                    )}

                    {task.deadline && (
                        <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Ngày hạn</span>
                            <p className="font-medium">
                                {new Date(task.deadline).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 pt-4">
                        {/* Status change buttons - only show for todo tasks */}
                        {task.status === 'todo' && (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        onStatusChange(task.id, 'completed');
                                        onClose();
                                    }}
                                    className="text-green-600 hover:text-green-700 border-green-300"
                                >
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Hoàn thành
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        onStatusChange(task.id, 'miss');
                                        onClose();
                                    }}
                                    className="text-red-600 hover:text-red-700 border-red-300"
                                >
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    Bỏ lỡ
                                </Button>
                            </>
                        )}

                        {/* Show current status for completed/miss tasks */}
                        {(task.status === 'completed' || task.status === 'miss') && (
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="text-gray-500">Trạng thái:</span>
                                <Badge variant={task.status === 'completed' ? 'default' : 'destructive'}>
                                    {task.status === 'completed' ? 'Đã hoàn thành' : 'Đã bỏ lỡ'}
                                </Badge>
                            </div>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(task)}
                        >
                            <Edit className="h-4 w-4 mr-1" />
                            Chỉnh sửa
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                onDelete(task.id);
                                onClose();
                            }}
                            className="text-red-600 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
