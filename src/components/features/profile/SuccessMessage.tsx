"use client";

import { CheckCircle2 } from "lucide-react";

interface SuccessMessageProps {
    show: boolean;
}

export function SuccessMessage({ show }: SuccessMessageProps) {
    if (!show) return null;

    return (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-green-800 dark:text-green-200 font-medium">
                    Cập nhật hồ sơ thành công!
                </span>
            </div>
        </div>
    );
}
