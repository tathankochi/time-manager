"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, School, Save, X } from "lucide-react";
import { ProfileFormData, getMaxDate } from "@/lib/profile-utils";
import { vietnameseUniversities } from "@/lib/data/vietnameseUniversities";

interface ProfileFormProps {
    user: any;
    isEditing: boolean;
    formData: ProfileFormData;
    onFormDataChange: (data: ProfileFormData) => void;
    onSave: () => void;
    onCancel: () => void;
}

export function ProfileForm({
    user,
    isEditing,
    formData,
    onFormDataChange,
    onSave,
    onCancel
}: ProfileFormProps) {
    const handleInputChange = (field: keyof ProfileFormData, value: string) => {
        onFormDataChange({ ...formData, [field]: value });
    };

    return (
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
                        {/* Full Name Field */}
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
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
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

                        {/* Email Field */}
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

                    {/* University Field */}
                    <div className="space-y-2">
                        <Label htmlFor="university" className="text-gray-700 dark:text-gray-300">
                            Trường đại học
                        </Label>
                        {isEditing ? (
                            <Select
                                value={formData.university}
                                onValueChange={(value) => handleInputChange('university', value)}
                            >
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
                        {/* Date of Birth Field */}
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth" className="text-gray-700 dark:text-gray-300">
                                Ngày tháng năm sinh
                            </Label>
                            {isEditing ? (
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                    max={getMaxDate()}
                                />
                            ) : (
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                    <span className="text-gray-900 dark:text-white">
                                        {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Major Field */}
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
                                    onChange={(e) => handleInputChange('major', e.target.value)}
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

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex justify-end space-x-3 pt-6 border-t">
                            <Button variant="outline" onClick={onCancel}>
                                <X className="h-4 w-4 mr-2" />
                                Hủy
                            </Button>
                            <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="h-4 w-4 mr-2" />
                                Lưu thay đổi
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
