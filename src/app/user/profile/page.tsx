"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    User,
    Mail,
    School,
    Camera,
    CheckCircle2,
    X,
    Save
} from 'lucide-react';
import { vietnameseUniversities } from '@/lib/data/vietnameseUniversities';

// Utility function to get initials from full name
const getInitials = (fullName: string): string => {
    return fullName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export default function ProfilePage() {
    const { user, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        university: '',
        dateOfBirth: '',
        major: ''
    });

    // Initialize form data when user data changes
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                university: user.university || '',
                dateOfBirth: user.dateOfBirth || '',
                major: user.major || ''
            });
        }
    }, [user]);

    // Handle save changes
    const handleSave = () => {
        try {
            updateUser(formData);
            setIsEditing(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
        }
    };

    // Handle cancel editing
    const handleCancel = () => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                university: user.university || '',
                dateOfBirth: user.dateOfBirth || '',
                major: user.major || ''
            });
        }
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hồ sơ cá nhân</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Quản lý thông tin cá nhân và cài đặt tài khoản
                    </p>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                        <User className="h-4 w-4 mr-2" />
                        Chỉnh sửa hồ sơ
                    </Button>
                )}
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <span className="text-green-800 dark:text-green-200 font-medium">
                            Cập nhật hồ sơ thành công!
                        </span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="lg:col-span-1">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-2xl">
                                        {user?.fullName ? getInitials(user.fullName) : 'SV'}
                                    </AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                        <Camera className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <CardTitle className="text-xl text-gray-900 dark:text-white">
                            {user?.fullName || 'Sinh viên'}
                        </CardTitle>
                        <CardDescription>
                            {user?.university || 'Đại học'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Ngày sinh</span>
                                <Badge variant="outline">
                                    {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
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
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Chưa rõ'}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Information */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Thông tin cá nhân</span>
                        </CardTitle>
                        <CardDescription>
                            {isEditing ? 'Chỉnh sửa thông tin cá nhân của bạn' : 'Xem và quản lý thông tin cá nhân'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">
                                        Họ và tên
                                    </Label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="fullName"
                                                type="text"
                                                placeholder="Nguyễn Văn An"
                                                className="pl-10"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                    ) : (
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                            <span className="text-gray-900 dark:text-white">
                                                {user?.fullName || 'Chưa cập nhật'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                        Email sinh viên
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="sinhvien@university.edu.vn"
                                            className="pl-10 bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                                            value={user?.email || ''}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="university" className="text-gray-700 dark:text-gray-300">
                                    Trường đại học
                                </Label>
                                {isEditing ? (
                                    <Select value={formData.university} onValueChange={(value) => setFormData({ ...formData, university: value })}>
                                        <SelectTrigger>
                                            <div className="flex items-center">
                                                <School className="h-4 w-4 text-gray-400 mr-2" />
                                                <SelectValue placeholder="Chọn trường" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {vietnameseUniversities.map((uni) => (
                                                <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                        <span className="text-gray-900 dark:text-white">
                                            {user?.university || 'Chưa cập nhật'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth" className="text-gray-700 dark:text-gray-300">
                                        Ngày tháng năm sinh
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            id="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                            <span className="text-gray-900 dark:text-white">
                                                {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="major" className="text-gray-700 dark:text-gray-300">
                                        Chuyên ngành
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            id="major"
                                            type="text"
                                            placeholder="Khoa học máy tính"
                                            value={formData.major}
                                            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                            <span className="text-gray-900 dark:text-white">
                                                {user?.major || 'Chưa cập nhật'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Hủy
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        Lưu thay đổi
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
