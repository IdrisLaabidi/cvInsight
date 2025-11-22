import { useState } from 'react';
import { Recommendation } from '../../types/recommendation.types';

interface RecommendationCardProps {
    recommendation: Recommendation;
    onSave: (id: string) => void;
    onUnsave: (id: string) => void;
}

export default function RecommendationCard({ recommendation, onSave, onUnsave }: RecommendationCardProps) {
    const [isSaved, setIsSaved] = useState(recommendation.isSaved || false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveToggle = async () => {
        setIsLoading(true);
        try {
            if (isSaved) {
                await onUnsave(recommendation.id);
            } else {
                await onSave(recommendation.id);
            }
            setIsSaved(!isSaved);
        } catch (error) {
            console.error('Error toggling save:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getTypeIcon = () => {
        switch (recommendation.type) {
            case 'course':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                );
            case 'certification':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                );
            case 'training':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                );
            case 'opportunity':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
        }
    };

    const getTypeColor = () => {
        switch (recommendation.type) {
            case 'course': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
            case 'certification': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
            case 'training': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            case 'opportunity': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
        }
    };

    const getLevelBadge = () => {
        switch (recommendation.level) {
            case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        }
    };

    const getMatchScoreColor = () => {
        if (recommendation.matchScore >= 80) return 'text-green-600 dark:text-green-400';
        if (recommendation.matchScore >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-gray-600 dark:text-gray-400';
    };

    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${getTypeColor()}`}>
                        {getTypeIcon()}
                    </div>
                    <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            {recommendation.type}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{recommendation.provider}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`text-right ${getMatchScoreColor()}`}>
                        <p className="text-xl font-bold">{recommendation.matchScore}%</p>
                        <p className="text-xs">Match</p>
                    </div>
                    <button
                        onClick={handleSaveToggle}
                        disabled={isLoading}
                        className={`p-2 rounded-lg transition-colors ${
                            isSaved
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                    >
                        <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2 line-clamp-2">
                {recommendation.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {recommendation.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadge()}`}>
                    {recommendation.level.charAt(0).toUpperCase() + recommendation.level.slice(1)}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recommendation.duration}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                    {recommendation.price === null || recommendation.price === 0
                        ? '🎉 Free'
                        : `${recommendation.currency || '$'}${recommendation.price}`
                    }
                </span>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
                {recommendation.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                        {skill}
                    </span>
                ))}
                {recommendation.skills.length > 4 && (
                    <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                        +{recommendation.skills.length - 4}
                    </span>
                )}
            </div>

            {/* Why Recommended */}
            <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg mb-4">
                <p className="text-xs text-green-700 dark:text-green-400">
                    <span className="font-semibold">💡 Why recommended:</span> {recommendation.whyRecommended}
                </p>
            </div>

            {/* Action Button */}
            <a
                href={recommendation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
            >
                View Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    );
}