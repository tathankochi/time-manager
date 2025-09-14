# Calendar Components

This directory contains modular components for the calendar page, organized following React best practices for maintainability and reusability.

## Components Structure

### 📊 TaskStatistics
- **File**: `TaskStatistics.tsx`
- **Purpose**: Displays task statistics cards (total, completed, pending, overdue)
- **Props**: `stats` (TaskStats object)
- **Reusable**: ✅ Can be used in dashboard or other pages

### 📅 WeekCalendar
- **File**: `WeekCalendar.tsx`
- **Purpose**: Main calendar grid showing weekly view with time slots
- **Props**: 
  - `currentWeekStart`: Date
  - `allWeekTasks`: Record<string, any[]>
  - Navigation handlers: `onPreviousWeek`, `onNextWeek`, `onCurrentWeek`
  - `onTaskClick`: (task: any) => void
- **Features**: 
  - Week navigation
  - Time slot grid (24 hours)
  - Task display with categories and status
  - Legend for categories and statuses

### 🔍 TaskDetailModal
- **File**: `TaskDetailModal.tsx`
- **Purpose**: Modal for displaying and editing task details
- **Props**:
  - `task`: Task object
  - `onClose`: Close handler
  - `onEdit`: Edit handler
  - `onDelete`: Delete handler
  - `onStatusChange`: Status change handler
- **Features**:
  - Task information display
  - Status change buttons (for todo tasks)
  - Edit and delete actions

### 🔎 SearchAndFilters
- **File**: `SearchAndFilters.tsx`
- **Purpose**: Search input and filter controls
- **Props**: All filter state and setters
- **Features**:
  - Search input with icon
  - Collapsible filter panel
  - Integration with existing TaskFilters component

### 📋 SearchResults
- **File**: `SearchResults.tsx`
- **Purpose**: Displays filtered search results
- **Props**:
  - `filteredTasks`: Filtered task array
  - `onTaskClick`: Task click handler
- **Features**:
  - Task list with priority badges
  - Empty state with search icon
  - Clickable task items

## Utility Modules

### 📚 Calendar Utils (`src/lib/calendar-utils.ts`)
- Date manipulation functions
- Week navigation helpers
- Time slot generation
- Task-slot overlap detection

### 🛠️ Task Helpers (`src/lib/task-helpers.ts`)
- Category and priority styling
- Status formatting
- Task statistics calculation
- Task filtering logic

### 🎣 Custom Hook (`src/hooks/useCalendar.ts`)
- Centralized state management
- All calendar-related logic
- Event handlers
- Data processing

## Benefits of This Structure

### ✅ Maintainability
- Each component has a single responsibility
- Easy to locate and modify specific features
- Clear separation of concerns

### ✅ Reusability
- Components can be used in other pages
- Utility functions are pure and testable
- Custom hook can be shared across components

### ✅ Testability
- Each component can be tested in isolation
- Utility functions are pure functions
- Clear prop interfaces

### ✅ Performance
- Components can be memoized individually
- Reduced re-renders through proper state management
- Optimized imports through index file

## Usage Example

```tsx
import { 
    TaskStatistics, 
    WeekCalendar, 
    TaskDetailModal, 
    SearchAndFilters, 
    SearchResults 
} from "@/components/features/calendar";

// Use in your page component
<>
    <TaskStatistics stats={taskStats} />
    <WeekCalendar {...calendarProps} />
    <SearchAndFilters {...filterProps} />
    <SearchResults {...resultsProps} />
    {showModal && <TaskDetailModal {...modalProps} />}
</>
```

## File Organization

```
src/
├── components/
│   └── features/
│       └── calendar/
│           ├── TaskStatistics.tsx
│           ├── WeekCalendar.tsx
│           ├── TaskDetailModal.tsx
│           ├── SearchAndFilters.tsx
│           ├── SearchResults.tsx
│           ├── index.ts          # Barrel exports
│           └── README.md         # This file
├── lib/
│   ├── calendar-utils.ts         # Date/time utilities
│   └── task-helpers.ts          # Task-related utilities
└── hooks/
    └── useCalendar.ts           # Custom calendar hook
```

This modular approach makes the codebase more maintainable, testable, and follows React best practices for component organization.
