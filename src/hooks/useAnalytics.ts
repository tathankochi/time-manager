import { useState, useEffect } from 'react';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import { getRandomQuote } from '@/lib/analytics-utils';

/**
 * Motivational quotes for the analytics page
 */
const motivationalQuotes = [
    "Từng bước nhỏ hôm nay dẫn bạn đến những đỉnh cao ngày mai.",
    "Không có thất bại, chỉ có bài học.",
    "Hành động là chìa khóa mở ra mọi cơ hội.",
    "Tin vào bản thân, bạn có thể làm được mọi thứ.",
    "Mỗi ngày là một cơ hội để bắt đầu lại.",
    "Kiên trì biến giấc mơ thành hiện thực.",
    "Thành công không đến từ may mắn, mà từ nỗ lực.",
    "Đừng chờ đợi thời điểm hoàn hảo, hãy bắt đầu ngay bây giờ.",
    "Bạn mạnh mẽ hơn những thử thách bạn đối mặt.",
    "Mỗi khó khăn là một cơ hội để trưởng thành.",
    "Hãy là phiên bản tốt nhất của chính mình.",
    "Không gì là không thể khi bạn quyết tâm.",
    "Hôm nay là ngày để bạn tỏa sáng.",
    "Từng nỗ lực nhỏ sẽ dẫn bạn đến những thành công lớn.",
    "Đừng sợ thất bại, hãy sợ việc không cố gắng."
];

/**
 * Custom hook for analytics page state management
 */
export function useAnalytics() {
    const analyticsData = useAnalyticsData();
    const [randomQuote, setRandomQuote] = useState("");

    // Select a random motivational quote once when component mounts
    useEffect(() => {
        const selectedQuote = getRandomQuote(motivationalQuotes);
        setRandomQuote(selectedQuote);
    }, []);

    return {
        // Analytics data from existing hook
        ...analyticsData,

        // Quote state
        randomQuote
    };
}
