import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import {
    ProfileFormData,
    getDefaultProfileData,
    validateProfileData,
    hasProfileChanges
} from '@/lib/profile-utils';

/**
 * Custom hook for profile state management and operations
 */
export function useProfile() {
    const { user, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>(() => getDefaultProfileData(user));

    // Initialize form data when user data changes
    useEffect(() => {
        if (user) {
            const defaultData = getDefaultProfileData(user);
            setFormData(defaultData);
        }
    }, [user]);

    // Handle save changes
    const handleSave = () => {
        try {
            // Validate form data
            const validation = validateProfileData(formData);
            if (!validation.isValid) {
                console.error('Validation errors:', validation.errors);
                return;
            }

            // Check if there are changes
            const originalData = getDefaultProfileData(user);
            if (!hasProfileChanges(originalData, formData)) {
                setIsEditing(false);
                return;
            }

            updateUser(formData);
            setIsEditing(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
        }
    };

    // Handle cancel editing
    const handleCancel = () => {
        if (user) {
            const defaultData = getDefaultProfileData(user);
            setFormData(defaultData);
        }
        setIsEditing(false);
    };

    // Handle form data change
    const handleFormDataChange = (newData: ProfileFormData) => {
        setFormData(newData);
    };

    // Handle edit button click
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handle avatar click (placeholder for future implementation)
    const handleAvatarClick = () => {
        // TODO: Implement avatar upload functionality
        console.log('Avatar upload clicked');
    };

    return {
        // State
        isEditing,
        showSuccess,
        formData,

        // User data
        user,

        // Handlers
        handleSave,
        handleCancel,
        handleFormDataChange,
        handleEditClick,
        handleAvatarClick,

        // Setters
        setIsEditing,
        setShowSuccess
    };
}
