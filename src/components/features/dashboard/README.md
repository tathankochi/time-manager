# Dashboard Components

Cấu trúc modular cho dashboard page, được thiết kế để tái sử dụng và dễ mở rộng.

## 🏗️ Cấu trúc Components

### 📊 WelcomeHeader
- **File**: `WelcomeHeader.tsx`
- **Mục đích**: Header chào mừng với thông tin thời gian và điểm năng suất
- **Props**: 
  - `userName`: string
  - `currentTime`: Date
  - `productivityScore`: number
- **Tính năng**:
  - Hiển thị tên người dùng
  - Thời gian hiện tại theo định dạng Việt Nam
  - Điểm năng suất với icon Brain

### 📈 StatsOverview
- **File**: `StatsOverview.tsx`
- **Mục đích**: 4 cards thống kê chính của dashboard
- **Props**:
  - `todayTasks`: Task[] - Nhiệm vụ hôm nay
  - `productivityScore`: number - Điểm năng suất
  - `completedTasks`: number - Số nhiệm vụ đã hoàn thành
- **Cards bao gồm**:
  - Nhiệm vụ hôm nay (với progress bar)
  - Điểm năng suất 7 ngày qua
  - Nhiệm vụ hoàn thành 7 ngày qua
  - Thời gian được phân bổ hôm nay

### ⏰ UpcomingDeadlines
- **File**: `UpcomingDeadlines.tsx`
- **Mục đích**: Hiển thị các deadline sắp tới
- **Props**:
  - `tasks`: Task[] - Danh sách tất cả tasks
  - `limit?`: number - Số lượng deadline hiển thị (default: 3)
- **Tính năng**:
  - Sắp xếp theo thời gian deadline
  - Highlight deadline khẩn cấp (< 2 ngày)
  - Empty state khi không có deadline

## 🛠️ Utility Modules

### 📚 Dashboard Utils (`src/lib/dashboard-utils.ts`)
- `calculateAllocatedTime()` - Tính tổng thời gian được phân bổ
- `formatAllocatedTime()` - Format thời gian hiển thị
- `formatVietnameseTime()` - Format thời gian theo định dạng Việt Nam
- `getUpcomingDeadlines()` - Lấy danh sách deadline sắp tới
- `isDeadlineUrgent()` - Kiểm tra deadline có khẩn cấp không
- `calculateTodayCompletionRate()` - Tính tỷ lệ hoàn thành hôm nay
- `getProductivityDescription()` - Lấy mô tả điểm năng suất
- `getProductivityTrend()` - Lấy xu hướng năng suất

### 🎣 Custom Hook (`src/hooks/useDashboard.ts`)
- Quản lý state của dashboard
- Tích hợp với useUser và useAnalyticsData
- Cập nhật thời gian real-time
- Cung cấp dữ liệu đã xử lý cho components

## 📊 So sánh Before/After

### ❌ Trước khi refactor:
- **238 dòng code** trong 1 file
- Logic phức tạp nhúng trực tiếp trong component
- Khó test và maintain
- Không tái sử dụng được

### ✅ Sau khi refactor:
- **85 dòng code** trong main component (giảm 64%)
- Logic được tách ra thành utilities và hooks
- Components tái sử dụng được
- Dễ test từng phần riêng biệt
- Cấu trúc rõ ràng và dễ mở rộng

## 🔄 Cách sử dụng

```tsx
import { 
    WelcomeHeader, 
    StatsOverview, 
    UpcomingDeadlines 
} from "@/components/features/dashboard";
import { useDashboard } from "@/hooks/useDashboard";

function MyDashboard() {
    const { userName, currentTime, tasks, todayTasks, productivityScore, completedTasks } = useDashboard();
    
    return (
        <div className="space-y-6">
            <WelcomeHeader 
                userName={userName}
                currentTime={currentTime}
                productivityScore={productivityScore}
            />
            
            <StatsOverview
                todayTasks={todayTasks}
                productivityScore={productivityScore}
                completedTasks={completedTasks}
            />
            
            <UpcomingDeadlines tasks={tasks} />
        </div>
    );
}
```

## 🎯 Lợi ích

### ✅ Tái sử dụng
- Components có thể dùng trong các trang khác
- Utilities có thể dùng cho analytics, reports, etc.

### ✅ Maintainability
- Mỗi component có trách nhiệm rõ ràng
- Dễ tìm và sửa lỗi
- Code dễ đọc và hiểu

### ✅ Testability
- Test từng component riêng biệt
- Test utilities độc lập
- Mock data dễ dàng

### ✅ Performance
- Components có thể được memoize
- Giảm re-render không cần thiết
- Lazy loading components

### ✅ Scalability
- Dễ thêm components mới
- Dễ customize từng phần
- Cấu trúc mở rộng được

## 📁 File Organization

```
src/
├── components/
│   └── features/
│       └── dashboard/
│           ├── WelcomeHeader.tsx
│           ├── StatsOverview.tsx
│           ├── UpcomingDeadlines.tsx
│           ├── index.ts          # Barrel exports
│           └── README.md         # Documentation
├── lib/
│   └── dashboard-utils.ts        # Utility functions
└── hooks/
    └── useDashboard.ts          # Dashboard state management
```

Cấu trúc modular này giúp dashboard dễ maintain, test và mở rộng hơn rất nhiều so với trước đây.
