[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)
# To-Do App – Preliminary Assignment Submission
⚠️ Please complete **all sections marked with the ✍️ icon** — these are required for your submission.

👀 Please Check ASSIGNMENT.md file in this repository for assignment requirements.

## 🚀 Project Setup & Usage
**How to install and run your project:**  
✍️  
Example (replace with your actual steps)  
- `npm install`  
- `npm run dev`

## 🔗 Deployed Web URL or APK file
https://web-track-naver-vietnam-ai-hackatho-one-mu.vercel.app/


## 🎥 Demo Video
**Demo video link (≤ 2 minutes):**  
📌 **Video Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.  
- “Unlisted” videos can only be viewed by users who have the link.  
- The video will not appear in search results or on your channel.  
- Share the link in your README so mentors can access it.  

https://youtu.be/XqFrXVgFhKY


## 💻 Project Introduction

### a. Overview

StudyFlow là ứng dụng quản lý thời gian dành cho sinh viên, giúp tạo và quản lí các nhiệm vụ theo từng khung giờ trong ngày. Tính năng Pomodoro dùng để quán lí các phiên tập trung. Tính năng thông kê năng suất và nhiệm vụ. Ứng dụng hoạt động hoàn toàn client-side với lưu trữ cục bộ.

### b. Key Features & Function Manual

- Đăng ký/Đăng nhập cục bộ: phiên được lưu bằng `localStorage/sessionStorage`.  
- Quản lý tác vụ (CRUD): tạo, cập nhật, xóa, đánh dấu hoàn thành/bỏ lỡ cho từng nhiệm vụ. Các trường thông tin gồm: tiêu đề, mô tả, danh mục, mức độ ưu tiên, thời gian bắt đầu/kết thúc.  
- Phân loại & tìm kiếm: lọc theo trạng thái/độ ưu tiên/danh mục, tìm kiếm theo từ khóa.  
- Lịch tuần: hiển thị tác vụ theo từng ngày, từng khung giờ, kiểm tra xung đột thời gian khi tạo/sửa task.  
- Dashboard: tổng quan việc cần làm trong ngày, nhiệm vụ quan trọng sắp tới, nhiệm vụ có  deadline gần nhất, biều đồ hiệu suất, nhiệm vụ hoàn thành trong 7 ngày vừa qua và thời gian được phân bổ hôm nay
- Analytics: biểu đồ hiệu suất 7 ngày vừa qua theo dạng cột, thống kê phân bố nhiệm vụ theo loại, theo mức độ ưu tiên, phiên tập trung và nhiệm vụ đã hoàn thành và quote động lực.
- Pomodoro Timer: đếm ngược Focus/Short break/Long break, thống kê phiên theo ngày và phát âm báo khi đến thời gian.  
- Hồ sơ cá nhân: cập nhật tên, trường đại học, ngày tháng năm sinh, ngành học.

### c. Unique Features (What’s special about this app?) 

- Quản lí các phiên tập trung bằng Pomodoro.
- Tính điểm năng suất 0–100 dựa trên: tỉ lệ hoàn thành, tỉ lệ hoàn thành task quan trọng, mức độ hoạt động theo ngày trong 7 ngày gần nhất.  
- Biểu đồ hiệu suất theo tuần.
- Phát hiện xung đột thời gian giữa các tác vụ trong cùng ngày bằng so khớp mốc phút.

### d. Technology Stack and Implementation Methods

- Frontend: Next.js 15 (App Router), React 19  
- UI: Tailwind CSS 4, ShadCN (Radix UI), Lucide Icons, Recharts  
- State/Context: React Context (`UserContext`, `TaskContext`)  
- Ngày giờ: `date-fns`.
- Lưu trữ: `localStorage` và `sessionStorage` (không backend)  

### e. Service Architecture & Database structure (when used)

- Kiến trúc client-side:  
  - `src/lib/contexts/UserContext.tsx`: quản lý phiên đăng nhập, Remember me, cập nhật hồ sơ, điều hướng sau đăng nhập/đăng xuất.  
  - `src/lib/contexts/TaskContext.tsx`: quản lý danh sách task, thao tác CRUD, thống kê, kiểm tra xung đột, quản lý phiên Pomodoro; đồng bộ vào `localStorage`.  
  - Hooks đặc thù tính năng: `src/hooks/usePomodoroTimer.ts`, `src/hooks/useAnalyticsData.ts`, `src/hooks/useCalendar.ts`, `src/hooks/useDashboard.ts`, `src/hooks/useProfile.ts`.  
- Lưu trữ cục bộ (không DB server):  
  - Khóa `tm_session`: thông tin phiên người dùng 
  - Khóa `tm_tasks`: mảng Task.  
  - Khóa `tm_pomodoro_sessions`: mảng phiên Pomodoro

## 🧠 Reflection

### a. If you had more time, what would you expand?

- Tích hợp backend.
- Lên lịch thông minh: gợi ý giờ học tối ưu theo thói quen, tự sắp lịch tránh xung đột.


### b. If you integrate AI APIs more for your app, what would you do?

- Gợi ý kế hoạch học tập cá nhân hóa từ lịch trình và khối lượng task.   
- Tóm tắt tuần học và gợi ý cải thiện thói quen.  
- Gợi ý lịch ôn thi/Pomodoro xen kẽ theo phương pháp spaced repetition.


## ✅ Checklist
- [✅] Code runs without errors  
- [✅] All required features implemented (add/edit/delete/complete tasks)  
- [✅] All ✍️ sections are filled  
