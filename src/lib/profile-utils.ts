/**
 * Profile utility functions for user data formatting and validation
 */

/**
 * Get initials from full name
 */
export const getInitials = (fullName: string): string => {
    return fullName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Format date of birth for display
 */
export const formatDateOfBirth = (dateOfBirth: string | undefined): string => {
    if (!dateOfBirth) return 'Chưa cập nhật';
    return new Date(dateOfBirth).toLocaleDateString('vi-VN');
};

/**
 * Format join date for display
 */
export const formatJoinDate = (createdAt: string | undefined): string => {
    if (!createdAt) return 'Chưa rõ';
    return new Date(createdAt).toLocaleDateString('vi-VN');
};

/**
 * Get default values for profile form
 */
export const getDefaultProfileData = (user: any) => ({
    fullName: user?.fullName || '',
    university: user?.university || '',
    dateOfBirth: user?.dateOfBirth || '',
    major: user?.major || ''
});

/**
 * Validate profile form data
 */
export interface ProfileFormData {
    fullName: string;
    university: string;
    dateOfBirth: string;
    major: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export const validateProfileData = (data: ProfileFormData): ValidationResult => {
    const errors: Record<string, string> = {};

    // Validate full name
    if (!data.fullName.trim()) {
        errors.fullName = 'Họ và tên không được để trống';
    } else if (data.fullName.trim().length < 2) {
        errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    // Validate university
    if (!data.university.trim()) {
        errors.university = 'Vui lòng chọn trường đại học';
    }

    // Validate date of birth
    if (data.dateOfBirth) {
        const birthDate = new Date(data.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age < 16) {
            errors.dateOfBirth = 'Tuổi phải từ 16 trở lên';
        } else if (age > 100) {
            errors.dateOfBirth = 'Tuổi không hợp lệ';
        }
    }

    // Validate major
    if (data.major.trim() && data.major.trim().length < 2) {
        errors.major = 'Chuyên ngành phải có ít nhất 2 ký tự';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Check if profile data has changes
 */
export const hasProfileChanges = (original: ProfileFormData, current: ProfileFormData): boolean => {
    return (
        original.fullName !== current.fullName ||
        original.university !== current.university ||
        original.dateOfBirth !== current.dateOfBirth ||
        original.major !== current.major
    );
};

/**
 * Get maximum date for date input (today)
 */
export const getMaxDate = (): string => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Get default avatar fallback text
 */
export const getDefaultAvatarText = (fullName?: string): string => {
    return fullName ? getInitials(fullName) : 'SV';
};

/**
 * Get display name with fallback
 */
export const getDisplayName = (fullName?: string): string => {
    return fullName || 'Sinh viên';
};

/**
 * Get university display with fallback
 */
export const getUniversityDisplay = (university?: string): string => {
    return university || 'Đại học';
};
