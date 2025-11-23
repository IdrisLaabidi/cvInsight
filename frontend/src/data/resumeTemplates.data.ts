import {ResumeTemplate} from "../types/resumeTemplates.types.ts";

export const RESUME_TEMPLATES: ResumeTemplate[] = [
    {
        id: 'classic-blue',
        name: 'Classic Blue',
        description: 'Traditional professional layout with blue accents',
        thumbnail: '/templates/classic-blue.png',
        theme: 'blue',
        layout: 'classic',
        isPremium: false
    },
    {
        id: 'modern-green',
        name: 'Modern Green',
        description: 'Clean and modern design with green highlights',
        thumbnail: '/templates/modern-green.png',
        theme: 'green',
        layout: 'modern',
        isPremium: false
    },
    {
        id: 'minimal-purple',
        name: 'Minimal Purple',
        description: 'Minimalist design with purple accents',
        thumbnail: '/templates/minimal-purple.png',
        theme: 'purple',
        layout: 'minimal',
        isPremium: false
    },
    {
        id: 'creative-orange',
        name: 'Creative Orange',
        description: 'Bold and creative layout with orange theme',
        thumbnail: '/templates/creative-orange.png',
        theme: 'orange',
        layout: 'creative',
        isPremium: false
    },
    {
        id: 'professional-teal',
        name: 'Professional Teal',
        description: 'Corporate professional with teal accents',
        thumbnail: '/templates/professional-teal.png',
        theme: 'teal',
        layout: 'professional',
        isPremium: false
    }
];
