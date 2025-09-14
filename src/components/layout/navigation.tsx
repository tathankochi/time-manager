"use client";

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Sun,
  Moon,
  GraduationCap,
  User,
  Clock
} from 'lucide-react';
import { useUser } from '@/lib/contexts/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navigation() {
  const [activeModule, setActiveModule] = useState("");
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Tự động set activeModule dựa trên URL
  useEffect(() => {
    const pathSegments = pathname.split('/');
    const currentModule = pathSegments[pathSegments.length - 1];

    // Map URL segments to module names
    const moduleMap: { [key: string]: string } = {
      'dashboard': 'dashboard',
      'calendar': 'calendar',
      'pomodoro': 'pomodoro',
      'analytics': 'analytics',
    };

    if (moduleMap[currentModule]) {
      setActiveModule(moduleMap[currentModule]);
    }
  }, [pathname, setActiveModule]);

  const navigationItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'calendar', label: 'Lịch biểu', icon: Calendar },
    { id: 'pomodoro', label: 'Timer Pomodoro', icon: Clock },
    { id: 'analytics', label: 'Phân tích', icon: BarChart3 },
  ];
  const handleOnClick = (id: string) => {
    setActiveModule(id);
    router.push(`/user/${id}`);
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">StudyFlow</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Quản lý thời gian thông minh</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleOnClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge variant="destructive" className="text-xs px-2 py-1">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  {user?.fullName?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'SV'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.fullName || 'Sinh viên'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.university || 'Đại học'}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  setActiveModule('');
                  router.push('/user/profile');
                }}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Hồ sơ cá nhân</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}