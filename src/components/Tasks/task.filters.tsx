"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskFiltersProps {
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    filterPriority: string;
    setFilterPriority: (priority: string) => void;
    filterCategory: string;
    setFilterCategory: (category: string) => void;
}

export function TaskFilters({
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    filterCategory,
    setFilterCategory,
}: TaskFiltersProps) {
    const categories = [
        'Học tập',
        'Phát triển bản thân',
        'Giải trí',
        'Gia đình',
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Trạng thái
                    </label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="todo">Chưa làm</SelectItem>
                            <SelectItem value="completed">Hoàn thành</SelectItem>
                            <SelectItem value="miss">Bỏ lỡ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Độ ưu tiên
                    </label>
                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="high">Cao</SelectItem>
                            <SelectItem value="medium">Trung bình</SelectItem>
                            <SelectItem value="low">Thấp</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Môn học
                    </label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}