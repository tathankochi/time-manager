"use client";

import React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTask } from '@/lib/contexts/TaskContext';

interface TaskFormProps {
  task?: any;
  onClose: () => void;
}

export function TaskForm({ task, onClose }: TaskFormProps) {
  const { addTask, updateTask, checkTimeConflict } = useTask();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    category: task?.category || '',
    priority: task?.priority || 'medium',
    deadline: task?.deadline ? new Date(task.deadline) : undefined,
    startTime: task?.startTime || '',
    endTime: task?.endTime || '',
  });

  const [timeConflict, setTimeConflict] = useState<any>(null);
  const [timeValidationError, setTimeValidationError] = useState<string | null>(null);

  const categories = [
    'Học tập',
    'Phát triển bản thân',
    'Giải trí',
    'Gia đình',
  ];

  // Check for time conflicts when time or date changes
  const checkConflict = () => {
    if (formData.deadline && formData.startTime && formData.endTime) {
      const conflict = checkTimeConflict(
        formData.deadline.toISOString(),
        formData.startTime,
        formData.endTime,
        task?.id
      );
      setTimeConflict(conflict);
    } else {
      setTimeConflict(null);
    }
  };

  // Check time validation
  const checkTimeValidation = () => {
    if (formData.startTime && formData.endTime) {
      if (formData.startTime >= formData.endTime) {
        setTimeValidationError("Giờ kết thúc phải sau giờ bắt đầu.");
      } else {
        setTimeValidationError(null);
      }
    } else {
      setTimeValidationError(null);
    }
  };

  // Check if form is complete
  const isFormComplete = () => {
    return (
      formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.category !== '' &&
      formData.priority !== '' &&
      formData.deadline !== undefined &&
      formData.startTime !== '' &&
      formData.endTime !== '' &&
      !timeConflict &&
      !timeValidationError
    );
  };

  // Check conflicts and validation when relevant fields change
  React.useEffect(() => {
    checkConflict();
    checkTimeValidation();
  }, [formData.deadline, formData.startTime, formData.endTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      ...formData,
      deadline: formData.deadline?.toISOString(),
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }

    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {task ? 'Chỉnh sửa nhiệm vụ' : 'Tạo nhiệm vụ mới'}
          </DialogTitle>
          <DialogDescription>
            {task ? 'Cập nhật thông tin nhiệm vụ' : 'Thêm một nhiệm vụ mới vào danh sách của bạn'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              placeholder="Ví dụ: Làm bài tập Toán cao cấp"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết về nhiệm vụ..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Loại nhiệm vụ</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn môn học" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Độ ưu tiên</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.deadline ? (
                    format(formData.deadline, 'dd/MM/yyyy', { locale: vi })
                  ) : (
                    <span>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.deadline}
                  onSelect={(date) => setFormData({ ...formData, deadline: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Giờ bắt đầu</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="startTime"
                  type="time"
                  className="pl-10"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">Giờ kết thúc</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="endTime"
                  type="time"
                  className="pl-10"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {timeConflict && (
            <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>Có xung đột thời gian!</strong>
                <br />
                Nhiệm vụ "{timeConflict.title}" đã được lên lịch từ {timeConflict.startTime} đến {timeConflict.endTime} trong cùng ngày này.
              </AlertDescription>
            </Alert>
          )}

          {timeValidationError && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {timeValidationError}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!isFormComplete()}
            >
              {task ? 'Cập nhật' : 'Tạo nhiệm vụ'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}