"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
    Bell,
    CheckCircle2,
    AlertCircle,
    Info,
    Trash2,
    Settings,
    Clock,
    Calendar,
    BookOpen,
    Target,
    MessageSquare
} from 'lucide-react';
import { useNotificationStore } from '@/lib/stores/notificationStore';

export function NotificationCenter() {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification
    } = useNotificationStore();

    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [notificationSettings, setNotificationSettings] = useState({
        deadlineReminders: true,
        taskUpdates: true,
        goalAchievements: true,
        studyReminders: true,
        weeklyReports: true,
        systemUpdates: false,
    });

    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'unread') return !notification.read;
        if (filter === 'read') return notification.read;
        return true;
    });

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
            case 'warning': return <AlertCircle className="h-5 w-5 text-amber-600" />;
            case 'error': return <AlertCircle className="h-5 w-5 text-red-600" />;
            default: return <Info className="h-5 w-5 text-blue-600" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
            case 'medium': return 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/10';
            case 'low': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10';
            default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/10';
        }
    };

    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Vừa xong';
        if (diffMins < 60) return `${diffMins} phút trước`;
        if (diffHours < 24) return `${diffHours} giờ trước`;
        if (diffDays < 7) return `${diffDays} ngày trước`;
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trung tâm thông báo</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Quản lý thông báo và cài đặt nhắc nhở
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    {unreadCount > 0 && (
                        <Button
                            variant="outline"
                            onClick={markAllAsRead}
                        >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Đánh dấu tất cả đã đọc
                        </Button>
                    )}
                    <Badge variant="secondary" className="px-3 py-1">
                        {unreadCount} chưa đọc
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Notification List */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Filter Tabs */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                {([
                                    { key: 'all', label: 'Tất cả', count: notifications.length },
                                    { key: 'unread', label: 'Chưa đọc', count: unreadCount },
                                    { key: 'read', label: 'Đã đọc', count: notifications.length - unreadCount },
                                ] as const).map(({ key, label, count }) => (
                                    <button
                                        key={key}
                                        onClick={() => setFilter(key)}
                                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === key
                                                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        {label} ({count})
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <div className="space-y-4">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification) => (
                                <Card
                                    key={notification.id}
                                    className={`border-l-4 transition-all hover:shadow-md ${!notification.read ? 'ring-2 ring-blue-50 dark:ring-blue-900/20' : ''
                                        } ${getPriorityColor(notification.priority)}`}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3 flex-1">
                                                {getNotificationIcon(notification.type)}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h3 className={`font-semibold text-sm ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                                            }`}>
                                                            {notification.title}
                                                        </h3>
                                                        {!notification.read && (
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                                        )}
                                                    </div>
                                                    <p className={`text-sm ${!notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'
                                                        }`}>
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {formatTimeAgo(notification.createdAt)}
                                                        </span>
                                                        <Badge variant="outline" className="text-xs">
                                                            {notification.priority === 'high' ? 'Ưu tiên cao' :
                                                                notification.priority === 'medium' ? 'Ưu tiên trung' : 'Ưu tiên thấp'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {!notification.read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs"
                                                    >
                                                        Đánh dấu đã đọc
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Bell className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        {filter === 'unread' ? 'Không có thông báo chưa đọc' :
                                            filter === 'read' ? 'Không có thông báo đã đọc' : 'Chưa có thông báo nào'}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Các thông báo mới sẽ xuất hiện ở đây
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Settings Sidebar */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <Bell className="h-5 w-5" />
                                <span>Thống kê</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Tổng số</span>
                                    <span className="font-semibold">{notifications.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Chưa đọc</span>
                                    <span className="font-semibold text-blue-600">{unreadCount}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Hôm nay</span>
                                    <span className="font-semibold">
                                        {notifications.filter(n =>
                                            n.createdAt.toDateString() === new Date().toDateString()
                                        ).length}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <Settings className="h-5 w-5" />
                                <span>Cài đặt thông báo</span>
                            </CardTitle>
                            <CardDescription>
                                Tùy chỉnh các loại thông báo bạn muốn nhận
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        key: 'deadlineReminders',
                                        label: 'Nhắc nhở deadline',
                                        description: 'Thông báo trước hạn nộp bài',
                                        icon: Calendar,
                                    },
                                    {
                                        key: 'taskUpdates',
                                        label: 'Cập nhật nhiệm vụ',
                                        description: 'Khi có thay đổi về nhiệm vụ',
                                        icon: CheckCircle2,
                                    },
                                    {
                                        key: 'goalAchievements',
                                        label: 'Đạt mục tiêu',
                                        description: 'Khi hoàn thành mục tiêu',
                                        icon: Target,
                                    },
                                    {
                                        key: 'studyReminders',
                                        label: 'Nhắc nhở học tập',
                                        description: 'Lời nhắc giờ học và nghỉ giải lao',
                                        icon: BookOpen,
                                    },
                                    {
                                        key: 'weeklyReports',
                                        label: 'Báo cáo tuần',
                                        description: 'Tổng kết hiệu suất hàng tuần',
                                        icon: Clock,
                                    },
                                    {
                                        key: 'systemUpdates',
                                        label: 'Cập nhật hệ thống',
                                        description: 'Thông báo về tính năng mới',
                                        icon: MessageSquare,
                                    },
                                ].map(({ key, label, description, icon: Icon }) => (
                                    <div key={key} className="flex items-center justify-between space-x-3">
                                        <div className="flex items-start space-x-3 flex-1">
                                            <Icon className="h-4 w-4 text-gray-500 mt-1" />
                                            <div className="flex-1">
                                                <Label htmlFor={key} className="text-sm font-medium cursor-pointer">
                                                    {label}
                                                </Label>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                        <Switch
                                            id={key}
                                            checked={notificationSettings[key as keyof typeof notificationSettings]}
                                            onCheckedChange={(checked) =>
                                                setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}