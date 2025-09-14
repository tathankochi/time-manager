"use client";

import { useProfile } from "@/hooks/useProfile";
import {
    ProfileHeader,
    ProfileCard,
    ProfileForm,
    SuccessMessage
} from "@/components/features/profile";

export default function ProfilePage() {
    const {
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
        handleAvatarClick
    } = useProfile();

    return (
        <div className="space-y-6">
            {/* Header */}
            <ProfileHeader
                isEditing={isEditing}
                onEditClick={handleEditClick}
            />

            {/* Success Message */}
            <SuccessMessage show={showSuccess} />

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <ProfileCard
                    user={user}
                    isEditing={isEditing}
                    onAvatarClick={handleAvatarClick}
                />

                {/* Profile Form */}
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
