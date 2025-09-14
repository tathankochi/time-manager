"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface ProfileHeaderProps {
    isEditing: boolean;
    onEditClick: () => void;
}

export function ProfileHeader({ isEditing, onEditClick }: ProfileHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hồ sơ cá nhân</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Quản lý thông tin cá nhân và cài đặt tài khoản
                </p>
            </div>
            {!isEditing && (
                <Button onClick={onEditClick} className="bg-blue-600 hover:bg-blue-700">
                    <User className="h-4 w-4 mr-2" />
                    Chỉnh sửa hồ sơ
                </Button>
            )}
        </div>
    );
}
