# Profile Components

Cấu trúc modular cho profile page, được thiết kế để tái sử dụng và dễ mở rộng.

## 🏗️ Cấu trúc Components

### 📋 ProfileHeader
- **File**: `ProfileHeader.tsx`
- **Mục đích**: Header với title và edit button
- **Props**: 
  - `isEditing`: boolean
  - `onEditClick`: () => void
- **Tính năng**:
  - Hiển thị title và description
  - Edit button (chỉ hiện khi không editing)

### 👤 ProfileCard
- **File**: `ProfileCard.tsx`
- **Mục đích**: Card hiển thị thông tin cơ bản của user
- **Props**:
  - `user`: User object
  - `isEditing`: boolean
  - `onAvatarClick`: () => void
- **Tính năng**:
  - Avatar với fallback initials
  - Basic info display (name, university, birth date, major, join date)
  - Camera button khi editing

### 📝 ProfileForm
- **File**: `ProfileForm.tsx`
- **Mục đích**: Form để edit profile information
- **Props**:
  - `user`: User object
  - `isEditing`: boolean
  - `formData`: ProfileFormData
  - `onFormDataChange`: (data) => void
  - `onSave`: () => void
  - `onCancel`: () => void
- **Tính năng**:
  - Form fields với validation
  - Save/Cancel buttons
  - Responsive layout

### ✅ SuccessMessage
- **File**: `SuccessMessage.tsx`
- **Mục đích**: Hiển thị thông báo thành công
- **Props**:
  - `show`: boolean
- **Tính năng**:
  - Conditional rendering
  - Success styling

## 🛠️ Utility Modules

### 📚 Profile Utils (`src/lib/profile-utils.ts`)
- `getInitials()` - Tạo initials từ full name
- `formatDateOfBirth()` - Format ngày sinh
- `formatJoinDate()` - Format ngày tham gia
- `getDefaultProfileData()` - Lấy default form data
- `validateProfileData()` - Validate form data
- `hasProfileChanges()` - Kiểm tra có thay đổi không
- `getMaxDate()` - Lấy max date cho date input

### 🎣 Custom Hook (`src/hooks/useProfile.ts`)
- State management cho profile form
- Save/cancel handlers
- Form validation
- Success message handling
- Integration với useUser hook

## 📊 So sánh Before/After

### ❌ Trước khi refactor:
- **318 dòng code** trong 1 file
- Logic phức tạp nhúng trực tiếp
- Khó test và maintain
- Không tái sử dụng được

### ✅ Sau khi refactor:
- **61 dòng code** trong main component (giảm 81%)
- **4 components** tái sử dụng được
- **1 custom hook** quản lý state
- **8 utility functions** xử lý logic
- Dễ test từng phần riêng biệt

## 🔄 Cách sử dụng

```tsx
import { 
    ProfileHeader, 
    ProfileCard, 
    ProfileForm, 
    SuccessMessage 
} from "@/components/features/profile";
import { useProfile } from "@/hooks/useProfile";

function MyProfilePage() {
    const {
        isEditing,
        showSuccess,
        formData,
        user,
        handleSave,
        handleCancel,
        handleFormDataChange,
        handleEditClick,
        handleAvatarClick
    } = useProfile();
    
    return (
        <div className="space-y-6">
            <ProfileHeader 
                isEditing={isEditing}
                onEditClick={handleEditClick}
            />
            
            <SuccessMessage show={showSuccess} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ProfileCard 
                    user={user}
                    isEditing={isEditing}
                    onAvatarClick={handleAvatarClick}
                />
                
                <ProfileForm
                    user={user}
                    isEditing={isEditing}
                    formData={formData}
                    onFormDataChange={handleFormDataChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}
```

## 🎯 Lợi ích

### ✅ Tái sử dụng
- Components có thể dùng trong settings, admin panel, etc.
- Form validation logic có thể dùng cho other forms

### ✅ Maintainability
- Mỗi component có trách nhiệm rõ ràng
- Dễ tìm và sửa lỗi
- Code dễ đọc và hiểu

### ✅ Testability
- Test từng component riêng biệt
- Test form validation độc lập
- Mock user data dễ dàng

### ✅ Performance
- Components có thể được memoize
- Giảm re-render không cần thiết
- Form state được tối ưu

### ✅ Scalability
- Dễ thêm fields mới
- Dễ customize validation rules
- Dễ thêm features như avatar upload

## 📁 File Organization

```
src/
├── components/
│   └── features/
│       └── profile/
│           ├── ProfileHeader.tsx
│           ├── ProfileCard.tsx
│           ├── ProfileForm.tsx
│           ├── SuccessMessage.tsx
│           ├── index.ts          # Barrel exports
│           └── README.md         # Documentation
├── lib/
│   └── profile-utils.ts          # Utility functions
└── hooks/
    └── useProfile.ts            # Profile state management
```

Cấu trúc modular này giúp profile page dễ maintain, test và mở rộng hơn rất nhiều so với trước đây.
