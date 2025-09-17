"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

/**
 * Props interface cho PaginationControls component
 * @interface PaginationControlsProps
 */
interface PaginationControlsProps {
    /** Trang hiện tại đang được hiển thị */
    currentPage: number;
    /** Tổng số trang có thể có */
    totalPages: number;
    /** Callback function khi user click vào một số trang cụ thể */
    onPageChange: (page: number) => void;
    /** Callback function khi user click nút "Trang trước" */
    onPreviousPage: () => void;
    /** Callback function khi user click nút "Trang sau" */
    onNextPage: () => void;
}

/**
 * Component điều khiển phân trang với UI đẹp và responsive
 * @param props - Props của PaginationControls component
 * @returns JSX.Element | null
 */
export function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
    onPreviousPage,
    onNextPage
}: PaginationControlsProps) {
    // Không hiển thị pagination nếu chỉ có 1 trang hoặc không có trang nào
    if (totalPages <= 1) {
        return null;
    }

    /**
     * Tạo danh sách số trang để hiển thị với ellipsis (...)
     * @returns Array chứa số trang và dấu "..." để hiển thị
     */
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5; // Số trang tối đa hiển thị cùng lúc

        if (totalPages <= maxVisiblePages) {
            // Hiển thị tất cả trang nếu tổng số trang ít hơn maxVisiblePages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Luôn hiển thị trang đầu tiên
            pages.push(1);

            // Thêm ellipsis nếu trang hiện tại cách xa trang đầu
            if (currentPage > 3) {
                pages.push("...");
            }

            // Hiển thị các trang xung quanh trang hiện tại
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }

            // Thêm ellipsis nếu trang hiện tại cách xa trang cuối
            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Luôn hiển thị trang cuối cùng
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    // Lấy danh sách số trang để hiển thị
    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            {/* Hiển thị thông tin trang hiện tại */}
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <span>
                    Trang {currentPage} / {totalPages}
                </span>
            </div>

            {/* Container cho các nút điều khiển */}
            <div className="flex items-center space-x-1">
                {/* Nút "Trang trước" */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onPreviousPage}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Danh sách số trang */}
                {pageNumbers.map((page, index) => (
                    <div key={index}>
                        {page === "..." ? (
                            /* Hiển thị ellipsis (...) */
                            <div className="flex items-center justify-center h-8 w-8">
                                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                            </div>
                        ) : (
                            /* Nút số trang */
                            <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(page as number)}
                                className="h-8 w-8 p-0"
                            >
                                {page}
                            </Button>
                        )}
                    </div>
                ))}

                {/* Nút "Trang sau" */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
