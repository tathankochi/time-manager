/**
 * GENERAL UTILITIES
 * =================
 * 
 * File này chứa các utility functions chung cho toàn bộ ứng dụng:
 * - cn(): Function kết hợp và merge CSS classes với Tailwind CSS
 * - Sử dụng clsx để xử lý conditional classes
 * - Sử dụng tailwind-merge để resolve conflicts giữa các Tailwind classes
 * 
 * Sử dụng trong: Tất cả components để xử lý className props
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function để kết hợp và merge CSS classes
 * Giải quyết conflicts giữa các Tailwind CSS classes
 * @param inputs - Array các ClassValue (string, object, array, etc.)
 * @returns Merged CSS classes string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
