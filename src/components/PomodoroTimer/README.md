# Pomodoro Timer Module

Module Pomodoro Timer đã được refactor thành các component nhỏ, dễ quản lý và mở rộng.

## Cấu trúc Module

### Types & Interfaces
- `src/types/pomodoro.ts` - Định nghĩa các types và interfaces cho Pomodoro Timer

### Utilities
- `src/lib/pomodoro-utils.ts` - Các utility functions cho formatting, colors, audio, và configuration

### Custom Hook
- `src/hooks/usePomodoroTimer.ts` - Hook quản lý state và logic của timer

### Components

#### 1. PomodoroTimer (Main Component)
- Component chính kết hợp tất cả các component con
- Sử dụng custom hook để quản lý state
- Layout và structure tổng thể

#### 2. TimerTypeSelector
- Cho phép chọn loại timer (focus, shortBreak, longBreak)
- Hiển thị thời gian tương ứng cho mỗi loại
- Disable khi timer đang chạy

#### 3. TimerDisplay
- Hiển thị thời gian còn lại
- Progress bar
- Badge "Hoàn thành!" khi timer kết thúc
- Màu sắc thay đổi theo loại timer

#### 4. TimerControls
- Nút Start/Pause/Reset
- Logic điều khiển timer
- Màu sắc và icon thay đổi theo trạng thái

#### 5. PomodoroStats
- Hiển thị thống kê các phiên pomodoro trong ngày
- Phân loại theo focus, short break, long break

#### 6. StatusMessage
- Hiển thị thông báo trạng thái
- Message khác nhau cho từng loại timer
- Styling khác nhau cho completed vs running

## Lợi ích của việc Refactor

### 1. Separation of Concerns
- Mỗi component có trách nhiệm riêng biệt
- Logic được tách biệt khỏi UI
- Dễ test và debug

### 2. Reusability
- Các component có thể tái sử dụng
- Dễ dàng thay đổi layout hoặc styling
- Có thể sử dụng trong các context khác

### 3. Maintainability
- Code dễ đọc và hiểu
- Dễ thêm tính năng mới
- Dễ sửa lỗi

### 4. Scalability
- Dễ mở rộng thêm tính năng
- Có thể thêm component mới
- Dễ customize cho từng use case

## Cách sử dụng

```tsx
import { PomodoroTimer } from '@/components/PomodoroTimer';

// Sử dụng component chính
<PomodoroTimer />

// Hoặc sử dụng từng component riêng lẻ
import { TimerDisplay, TimerControls } from '@/components/PomodoroTimer';
```

## Configuration

Các cấu hình có thể được thay đổi trong `src/lib/pomodoro-utils.ts`:
- Thời gian cho mỗi loại timer
- Labels và colors
- Audio settings
