export type TemplateTheme = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';
export type TemplateLayout = 'classic' | 'modern' | 'minimal' | 'creative' | 'professional';

export interface ResumeTemplate {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    theme: TemplateTheme;
    layout: TemplateLayout;
    isPremium?: boolean;
}