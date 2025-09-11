// src/components/auth/AuthModule.tsx
"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { LoginForm } from "./LoginForm";
// import { RegisterForm } from "./RegisterForm";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            StudyFlow
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ứng dụng quản lý thời gian dành cho sinh viên Việt Nam
          </p>
        </div>

        <Card className="w-full shadow-xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              {isLogin ? "Chào mừng trở lại!" : "Tạo tài khoản mới"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {isLogin
                ? "Đăng nhập để tiếp tục quản lý thời gian học tập"
                : "Tham gia cộng đồng sinh viên thông minh"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}