export type RecommendationType = 'COURSE' | 'CERTIFICATION' | 'TRAINING' | 'OPPORTUNITY';
export type RecommendationLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type RecommendationProvider = 'COURSERA' | 'UDEMY' | 'LINKEDIN' | 'AWS' | 'GOOGLE' | 'MICROSOFT' | 'OTHER';

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
    priceRange?: { min: number; max: number };
    priceMode?:'FREE' | 'ALL';
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