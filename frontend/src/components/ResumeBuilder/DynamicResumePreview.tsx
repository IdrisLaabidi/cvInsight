import React from "react";
import { RESUME_TEMPLATES } from "../../data/resumeTemplates.data";
import { THEME_COLORS } from "../../constants/resumeThemes";
import ResumePreview from "./ResumePreview";

interface DynamicResumePreviewProps {
    templateId: string;
}

export const DynamicResumePreview: React.FC<DynamicResumePreviewProps> = ({ templateId }) => {
    const template = RESUME_TEMPLATES.find(t => t.id === templateId);
    const theme = template ? THEME_COLORS[template.theme] : THEME_COLORS.blue;

    return (
        <div className={`w-full h-full bg-white rounded-xl p-8 ${theme.secondary}`}>
            <div className={`border-b-2 ${theme.border} pb-4 mb-6`}>
                {/* Optional: Preview header with theme styles */}
            </div>

            <ResumePreview />
        </div>
    );
};
