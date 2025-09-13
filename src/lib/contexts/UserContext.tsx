"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Định nghĩa kiểu dữ liệu User
interface User {
  email: string;
  fullName: string;
  university?: string;
  avatar?: string;
}

// Định nghĩa kiểu cho Context
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// Tạo Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Props cho Provider
interface UserProviderProps {
  children: ReactNode;
}

// Provider Component
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Tải thông tin user từ session khi component mount
  useEffect(() => {
    loadUserFromSession();
  }, []);

  // Hàm tải user từ session storage
  const loadUserFromSession = () => {
    try {
      const sessionKey = "tm_session";
      let sessionData = null;

      // Thử lấy từ localStorage trước (remember me)
      if (typeof window !== 'undefined') {
        sessionData = localStorage.getItem(sessionKey);
        
        // Nếu không có trong localStorage, thử sessionStorage
        if (!sessionData) {
          sessionData = sessionStorage.getItem(sessionKey);
        }

        if (sessionData) {
          const session = JSON.parse(sessionData);
          setUser({
            email: session.email,
            fullName: session.fullName,
            university: session.university || 'Đại học',
            avatar: session.avatar
          });
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm đăng nhập
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setIsLoading(true);
      
      // Lấy danh sách users từ localStorage
      const usersKey = "tm_users";
      const raw = typeof window !== "undefined" ? localStorage.getItem(usersKey) : null;
      const users: Array<any> = raw ? JSON.parse(raw) : [];

      // Tìm user
      const emailLower = email.trim().toLowerCase();
      const foundUser = users.find((u) => u.email === emailLower && u.password === password);

      if (!foundUser) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }

      // Tạo session
      const session = {
        email: foundUser.email,
        fullName: foundUser.fullName,
        university: foundUser.university || 'Đại học',
        avatar: foundUser.avatar,
        createdAt: new Date().toISOString(),
      };

      // Lưu session
      const sessionKey = "tm_session";
      if (rememberMe) {
        localStorage.setItem(sessionKey, JSON.stringify(session));
      } else {
        sessionStorage.setItem(sessionKey, JSON.stringify(session));
      }

      // Cập nhật state
      setUser({
        email: session.email,
        fullName: session.fullName,
        university: session.university,
        avatar: session.avatar
      });

      // Chuyển hướng đến trang user
      router.push("/user");

    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    try {
      const sessionKey = "tm_session";
      if (typeof window !== 'undefined') {
        localStorage.removeItem(sessionKey);
        sessionStorage.removeItem(sessionKey);
      }
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
    }
  };

  // Hàm cập nhật thông tin user
  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
    
    // Cập nhật session storage
    if (user) {
      const sessionKey = "tm_session";
      const updatedUser = { ...user, ...updates };
      
      if (typeof window !== 'undefined') {
        let sessionData = localStorage.getItem(sessionKey) || sessionStorage.getItem(sessionKey);
        if (sessionData) {
          const session = JSON.parse(sessionData);
          const updatedSession = { ...session, ...updates };
          
          if (localStorage.getItem(sessionKey)) {
            localStorage.setItem(sessionKey, JSON.stringify(updatedSession));
          } else {
            sessionStorage.setItem(sessionKey, JSON.stringify(updatedSession));
          }
        }
      }
    }
  };

  // Giá trị context
  const value: UserContextType = {
    user,
    isLoading,
    login,
    logout,
    updateUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook để sử dụng UserContext
export function useUser() {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}
