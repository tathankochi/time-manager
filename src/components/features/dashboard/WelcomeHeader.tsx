"use client";

import { Brain } from "lucide-react";
import { formatVietnameseTime } from "@/lib/dashboard-utils";

interface WelcomeHeaderProps {
    userName: string;
    currentTime: Date;
    productivityScore: number;
}

export function WelcomeHeader({ userName, currentTime, productivityScore }: WelcomeHeaderProps) {
    const formattedTime = formatVietnameseTime(currentTime);
    const dayAndDate = formattedTime.split(',')[0] + ', ' + formattedTime.split(',')[1];

    return (
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Xin chào {userName}!</h1>
                    <p className="text-blue-100">
                        Hôm nay là {dayAndDate}
                    </p>
                </div>
                <div className="text-right">
                    <div className="bg-white/20 rounded-lg p-3">
                        <Brain className="h-8 w-8 mb-2" />
                        <p className="text-sm">Điểm năng suất</p>
                        <p className="text-2xl font-bold">{productivityScore}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
