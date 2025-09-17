"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { getPriorityColor, getPriorityText } from "@/lib/task-helpers";
import { PaginationControls } from "./PaginationControls";

/**
 * Props interface cho SearchResults component
 * @interface SearchResultsProps
 */
interface SearchResultsProps {
    /** Danh sách tasks đã được filter và phân trang cho trang hiện tại */
    filteredTasks: any[];
    /** Tổng số tasks đã được filter (chưa phân trang) */
    allFilteredTasks: any[];
    /** Trang hiện tại trong pagination */
    currentPage: number;
    /** Tổng số trang có thể có */
    totalPages: number;
    /** Callback function khi user click vào một task */
    onTaskClick: (task: any) => void;
    /** Callback function khi user chuyển đến một trang cụ thể */
    onPageChange: (page: number) => void;
    /** Callback function khi user click nút "Trang trước" */
    onPreviousPage: () => void;
    /** Callback function khi user click nút "Trang sau" */
    onNextPage: () => void;
}

/**
 * Component hiển thị kết quả tìm kiếm tasks với phân trang
 * @param props - Props của SearchResults component
 * @returns JSX.Element
 */
export function SearchResults({
    filteredTasks,
    allFilteredTasks,
    currentPage,
    totalPages,
    onTaskClick,
    onPageChange,
    onPreviousPage,
    onNextPage
}: SearchResultsProps) {
    return (
        <Card>
            {/* Header với tiêu đề và số lượng kết quả */}
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Kết quả tìm kiếm</span>
                    {/* Hiển thị số lượng kết quả nếu có */}
                    {allFilteredTasks.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                            {allFilteredTasks.length} kết quả
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                {/* Kiểm tra nếu có kết quả tìm kiếm */}
                {allFilteredTasks.length > 0 ? (
                    <>
                        {/* Container chính cho danh sách tasks */}
                        <div className="p-6">
                            {/* Danh sách tasks với chiều cao cố định cho 5 items */}
                            <div className="space-y-2 h-[380px] flex flex-col justify-start">
                                {/* Render từng task item */}
                                {filteredTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        onClick={() => onTaskClick(task)}
                                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors h-[60px] flex-shrink-0"
                                    >
                                        {/* Layout cho thông tin task */}
                                        <div className="flex items-center justify-between h-full">
                                            {/* Thông tin chính của task */}
                                            <div className="flex-1 min-w-0">
                                                {/* Tiêu đề task */}
                                                <h4 className="font-medium text-sm truncate">{task.title}</h4>
                                                {/* Mô tả task */}
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{task.description}</p>
                                                {/* Metadata: category, deadline, time */}
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <Badge variant="outline" className="text-xs">
                                                        {task.category}
                                                    </Badge>
                                                    {/* Hiển thị deadline nếu có */}
                                                    {task.deadline && (
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(task.deadline).toLocaleDateString('vi-VN')}
                                                        </span>
                                                    )}
                                                    {/* Hiển thị thời gian nếu có */}
                                                    {task.startTime && task.endTime && (
                                                        <span className="text-xs text-gray-500">
                                                            {task.startTime}-{task.endTime}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Badge hiển thị priority */}
                                            <Badge variant={getPriorityColor(task.priority)}>
                                                {getPriorityText(task.priority)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}

                                {/* Fill không gian còn lại khi có ít hơn 5 items */}
                                {filteredTasks.length < 5 && (
                                    <div className="flex-1"></div>
                                )}
                            </div>
                        </div>

                        {/* Component điều khiển phân trang */}
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            onPreviousPage={onPreviousPage}
                            onNextPage={onNextPage}
                        />
                    </>
                ) : (
                    /* Empty state khi không có kết quả tìm kiếm */
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 p-6">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Không tìm thấy nhiệm vụ nào phù hợp với truy vấn.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
