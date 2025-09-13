# System Patterns

## Architecture
- Next.js App Router with server components.

## Key Patterns
- Local-first state, server-ready boundaries.
- UI components composed from a small, reusable kit.

## Data Model
- User: email, fullName, university?, avatar?.
- Task: id, userId, title, description, category, priority, status, deadline?, startTime?, endTime?, completed, createdAt, updatedAt.
- Session: id, taskId, startAt, endAt.

## Context Integration
- TaskContext tự động liên kết với UserContext qua email.
- Tasks được filter theo userId (email của user).
- Tất cả operations đều yêu cầu user đăng nhập.
