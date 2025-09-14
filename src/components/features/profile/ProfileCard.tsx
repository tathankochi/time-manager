"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";
import {
    getDefaultAvatarText,
    getDisplayName,
    getUniversityDisplay,
    formatDateOfBirth,
    formatJoinDate
} from "@/lib/profile-utils";

interface ProfileCardProps {
    user: any;
    isEditing: boolean;
    onAvatarClick?: () => void;
}

export function ProfileCard({ user, isEditing, onAvatarClick }: ProfileCardProps) {
    return (
        <Card className="lg:col-span-1">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-2xl">
                                {getDefaultAvatarText(user?.fullName)}
                            </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                            <button
                                onClick={onAvatarClick}
                                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                            >
                                <Camera className="h-3 w-3" />
                            </button>
                        )}
                    </div>
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {getDisplayName(user?.fullName)}
                </CardTitle>
                <CardDescription>
                    {getUniversityDisplay(user?.university)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Ngày sinh</span>
                        <Badge variant="outline">
                            {formatDateOfBirth(user?.dateOfBirth)}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Chuyên ngành</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {user?.major || 'Chưa cập nhật'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Tham gia</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatJoinDate(user?.createdAt)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
