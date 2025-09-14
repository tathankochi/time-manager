"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface MotivationalQuoteProps {
    quote: string;
}

export function MotivationalQuote({ quote }: MotivationalQuoteProps) {
    return (
        <div className="mt-8">
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16"></div>
                </div>

                <CardContent className="p-8 relative z-10">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed text-slate-700 dark:text-slate-300 italic">
                                {quote ? `"${quote}"` : "Đang tải câu động lực..."}
                            </blockquote>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
