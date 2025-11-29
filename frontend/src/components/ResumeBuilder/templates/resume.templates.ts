import {ResumeTemplate} from "../../../types/resume.types.ts";

export const RESUME_TEMPLATES: ResumeTemplate[] = [
    // Keep only one of the previous similar templates as a base/default
    {
        id: 'classic-blue',
        name: 'Classic Blue',
        description: 'Traditional professional layout with blue accents',
        thumbnail: '/templates/classic-blue.png',
        theme: 'blue',
        layout: 'classic',
        isPremium: false
    },

    // New template inspired by the provided green healthcare resume
    {
        id: 'health-green',
        name: 'Health Green',
        description: 'Clean healthcare style with green accent headings, dotted rules, and skill tags',
        thumbnail: '/templates/health-green.png',
        theme: 'green',
        layout: 'modern',
        isPremium: false
    },

    // New template inspired by the provided classic black lines resume
    {
        id: 'classic-lines',
        name: 'Classic Lines',
        description: 'Monochrome, serif headings with subtle top rule and section separators',
        thumbnail: '/templates/classic-lines.png',
        theme: 'mono',
        layout: 'classic',
        isPremium: false
    },

    // New template closely matching the provided screenshot (centered name, bold rules)
    {
        id: 'classic-lines2',
        name: 'Classic Lines',
        description: 'Centered name, black separators, uppercase headings; mirrors the provided image',
        thumbnail: '/templates/classic-lines.png',
        theme: 'mono',
        layout: 'classic',
        isPremium: false
    }
];
