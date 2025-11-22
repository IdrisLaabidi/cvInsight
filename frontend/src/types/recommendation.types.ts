// Types pour les recommandations de carrière

export type RecommendationType = 'course' | 'certification' | 'training' | 'opportunity';
export type RecommendationLevel = 'beginner' | 'intermediate' | 'advanced';
export type RecommendationProvider = 'coursera' | 'udemy' | 'linkedin' | 'aws' | 'google' | 'microsoft' | 'other';

export interface Recommendation {
    id: string;
    type: RecommendationType;
    title: string;
    provider: string;
    providerLogo?: string;
    description: string;
    matchScore: number; // 0-100
    level: RecommendationLevel;
    duration: string;
    price: number | null; // null = gratuit
    currency?: string;
    url: string;
    skills: string[];
    whyRecommended: string;
    isSaved?: boolean;
    category?: string;
}

export interface CVSummary {
    id: string;
    fileName: string;
    uploadedAt: string;
    detectedSkills: string[];
    experienceLevel: string;
    mainDomain: string;
    skillGaps: string[];
    completenessScore: number;
}

export interface RecommendationFilters {
    type?: RecommendationType;
    level?: RecommendationLevel[];
    priceRange?: { min: number; max: number } | 'free' | 'all';
    duration?: string[];
    providers?: string[];
    searchQuery?: string;
}

export interface CareerPathway {
    id: string;
    title: string;
    description: string;
    steps: PathwayStep[];
    estimatedDuration: string;
    targetRole: string;
}

export interface PathwayStep {
    order: number;
    title: string;
    type: RecommendationType;
    recommendationId?: string;
    isCompleted: boolean;
}