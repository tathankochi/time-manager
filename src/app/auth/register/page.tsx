"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
//import { useAuthStore } from "@/lib/stores/authStore";

const vietnameseUniversities = [
  "Đại học Quốc gia Hà Nội",
  "Đại học Quốc gia TP.HCM",
  "Đại học Bách khoa Hà Nội",
  "Đại học Kinh tế Quốc dân",
  "Đại học FPT",
  "Đại học RMIT Việt Nam",
  "Đại học Tôn Đức Thắng",
  "Khác",
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    dateOfBirth: "",
    university: "",
    major: "",
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usersKey = "tm_users";
      const raw = typeof window !== "undefined" ? localStorage.getItem(usersKey) : null;
      const users: Array<any> = raw ? JSON.parse(raw) : [];

      const email = formData.email.trim().toLowerCase();
      if (users.some((u) => u.email === email)) {
        toast.error("Email đã tồn tại", { description: "Vui lòng dùng email khác." });
        return;
      }

      const newUser = {
        email,
        password: formData.password,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        university: formData.university,
        major: formData.major,
      };

      users.push(newUser);
      localStorage.setItem(usersKey, JSON.stringify(users));

      toast.success("Tạo tài khoản thành công", { description: "Bạn sẽ được chuyển đến trang đăng nhập." });
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi", { description: "Vui lòng thử lại sau." });
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tạo tài khoản mới
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tham gia cộng đồng sinh viên thông minh
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">
            Họ và tên
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="fullName"
              type="text"
              placeholder="Nguyễn Văn An"
              className="pl-10"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="university" className="text-gray-700 dark:text-gray-300">
              Trường đại học
            </Label>
            <Select
              value={formData.university}
              onValueChange={(value) => setFormData({ ...formData, university: value })}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <School className="h-4 w-4 text-gray-400 mr-2" />
                  <SelectValue placeholder="Chọn trường" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {vietnameseUniversities.map((uni) => (
                  <SelectItem key={uni} value={uni}>
                    {uni}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-gray-700 dark:text-gray-300">
              Ngày tháng năm sinh
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
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
              className="pl-10"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
            Mật khẩu
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-2">
            <div className="flex items-center space-x-2 text-xs">
              <Badge variant={formData.password.length >= 8 ? "default" : "secondary"}>
                8+ ký tự
              </Badge>
              <Badge variant={/[A-Z]/.test(formData.password) ? "default" : "secondary"}>
                Chữ hoa
              </Badge>
              <Badge variant={/[0-9]/.test(formData.password) ? "default" : "secondary"}>
                Số
              </Badge>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Tạo tài khoản
        </Button>
      </form>
    </div>
  );
}