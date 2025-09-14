# Analytics Components

Cấu trúc modular cho analytics page, được thiết kế để tái sử dụng và dễ mở rộng.

## 🏗️ Cấu trúc Components

### 📊 KeyMetrics
- **File**: `KeyMetrics.tsx`
- **Mục đích**: Hiển thị 3 metrics chính của analytics
- **Props**: 
  - `productivityScore`: number
  - `completedTasks`: number
  - `totalTasks`: number
  - `completedFocusSessions`: number
  - `trend`: string
- **Tính năng**:
  - Productivity score với trend
  - Tasks completion rate
  - Focus sessions count

### 📈 WeeklyProductivityChart
- **File**: `WeeklyProductivityChart.tsx`
- **Mục đích**: Bar chart hiển thị productivity theo ngày
- **Props**:
  - `weeklyData`: any[]
- **Tính năng**:
  - Responsive chart với Recharts
  - 7 ngày gần nhất
  - Interactive tooltips

### 📚 CategoryDistribution
- **File**: `CategoryDistribution.tsx`
- **Mục đích**: Hiển thị phân bố tasks theo category
- **Props**:
  - `categoryData`: CategoryData[]
- **Tính năng**:
  - Icon mapping cho categories
  - Task count display
  - Responsive layout

### ⚡ PriorityDistribution
- **File**: `PriorityDistribution.tsx`
- **Mục đích**: Hiển thị phân bố tasks theo priority
- **Props**:
  - `priorityData`: PriorityData[]
- **Tính năng**:
  - Color-coded priority icons
  - Task count display
  - Priority level indicators

### 💬 MotivationalQuote
- **File**: `MotivationalQuote.tsx`
- **Mục đích**: Hiển thị câu động lực ngẫu nhiên
- **Props**:
  - `quote`: string
- **Tính năng**:
  - Beautiful gradient background
  - Quote display với styling
  - Background patterns

## 🛠️ Utility Modules

### 📚 Analytics Utils (`src/lib/analytics-utils.ts`)
- `getProductivityDescription()` - Mô tả điểm năng suất
- `getProductivityTrend()` - Xu hướng năng suất
- `getPriorityIconColor()` - Màu sắc icon theo priority
- `getCategoryIcon()` - Icon theo category
- `getRandomQuote()` - Lấy quote ngẫu nhiên
- `formatCompletionRate()` - Format completion rate
- `getChartConfig()` - Chart configuration
- `getTooltipConfig()` - Tooltip configuration

### 🎣 Custom Hook (`src/hooks/useAnalytics.ts`)
- Integration với useAnalyticsData
- Quote selection logic
- State management cho analytics page
- Data processing và formatting

## 📊 So sánh Before/After

### ❌ Trước khi refactor:
- **296 dòng code** trong 1 file
- Logic phức tạp nhúng trực tiếp
- Icon mappings inline
- Quotes array trong component
- Khó test và maintain

### ✅ Sau khi refactor:
- **62 dòng code** trong main component (giảm 79%)
- **5 components** tái sử dụng được
- **1 custom hook** quản lý state
- **8 utility functions** xử lý logic
- Dễ test từng phần riêng biệt

## 🔄 Cách sử dụng

```tsx
import { 
    KeyMetrics,
    WeeklyProductivityChart,
    CategoryDistribution,
    PriorityDistribution,
    MotivationalQuote
} from "@/components/features/analytics";
import { useAnalytics } from "@/hooks/useAnalytics";

function MyAnalyticsPage() {
    const {
        productivityScore,
        completedTasks,
        completedFocusSessions,
        totalTasks,
        trend,
        weeklyData,
        updatedCategoryData,
        priorityData,
        randomQuote
    } = useAnalytics();
    
    return (
        <div className="space-y-6">
            <KeyMetrics
                productivityScore={productivityScore}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
                completedFocusSessions={completedFocusSessions.length}
                trend={trend}
            />
            
            <div className="grid grid-cols-7 gap-6 items-stretch">
                <WeeklyProductivityChart weeklyData={weeklyData} />
                <CategoryDistribution categoryData={updatedCategoryData} />
                <PriorityDistribution priorityData={priorityData} />
            </div>
            
            <MotivationalQuote quote={randomQuote} />
        </div>
    );
}
```

## 🎯 Lợi ích

### ✅ Tái sử dụng
- Components có thể dùng trong dashboard, reports, etc.
- Chart component có thể dùng cho other data visualization
- Metrics cards có thể dùng trong summary views

### ✅ Maintainability
- Mỗi component có trách nhiệm rõ ràng
- Chart logic tách riêng khỏi UI
- Dễ thêm metrics mới

### ✅ Testability
- Test từng component riêng biệt
- Test chart data processing độc lập
- Mock analytics data dễ dàng

### ✅ Performance
- Components có thể được memoize
- Chart re-render được tối ưu
- Data processing được cache

### ✅ Scalability
- Dễ thêm chart types mới
- Dễ customize metrics
- Dễ thêm data sources

## 📁 File Organization

```
src/
├── components/
│   └── features/
│       └── analytics/
│           ├── KeyMetrics.tsx
│           ├── WeeklyProductivityChart.tsx
│           ├── CategoryDistribution.tsx
│           ├── PriorityDistribution.tsx
│           ├── MotivationalQuote.tsx
│           ├── index.ts          # Barrel exports
│           └── README.md         # Documentation
├── lib/
│   └── analytics-utils.ts        # Utility functions
└── hooks/
    └── useAnalytics.ts          # Analytics state management
```

## 🚀 Future Enhancements

### 📈 Chart Improvements
- Thêm more chart types (line, pie, area)
- Interactive filtering
- Export functionality
- Real-time updates

### 📊 Metrics Expansion
- Thêm more KPIs
- Comparison với previous periods
- Goal setting và tracking
- Performance trends

### 🎨 UI Enhancements
- Dark/light theme optimization
- Mobile responsiveness improvements
- Animation và transitions
- Customizable layouts

Cấu trúc modular này giúp analytics page dễ maintain, test và mở rộng hơn rất nhiều so với trước đây.
