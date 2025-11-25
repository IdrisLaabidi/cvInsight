import { useState } from 'react';
import {
    RecommendationFilters as FiltersType,
    RecommendationLevel,
    RecommendationProvider
} from '../../types/recommendation.types';

interface RecommendationFiltersProps {
    filters: FiltersType;
    onFiltersChange: (filters: FiltersType) => void;
    onReset: () => void;
}

export default function RecommendationFilters({ filters, onFiltersChange, onReset }: RecommendationFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleLevelChange = (level: RecommendationLevel) => {
        const currentLevels = filters.level || [];
        const newLevels = currentLevels.includes(level)
            ? currentLevels.filter(l => l !== level)
            : [...currentLevels, level];
        onFiltersChange({ ...filters, level: newLevels });
    };

    const handleDurationChange = (duration: string) => {
        const currentDurations = filters.duration || [];
        const newDurations = currentDurations.includes(duration)
            ? currentDurations.filter(d => d !== duration)
            : [...currentDurations, duration];
        onFiltersChange({ ...filters, duration: newDurations });
    };

    const handleProviderChange = (provider: RecommendationProvider) => {
        const currentProviders = filters.providers || [];
        const newProviders = currentProviders.includes(provider)
            ? currentProviders.filter(p => p !== provider)
            : [...currentProviders, provider];
        onFiltersChange({ ...filters, providers: newProviders });
    };

    const handlePriceChange = (value: 'ALL' | 'FREE') => {
        onFiltersChange({ ...filters, priceMode: value });
    };

    const hasActiveFilters = () => {
        return (filters.level?.length || 0) > 0 ||
            (filters.duration?.length || 0) > 0 ||
            (filters.providers?.length || 0) > 0 ||
            filters.priceMode === 'FREE';
    };

    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">Filters</h3>
                    {hasActiveFilters() && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                            Active
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {hasActiveFilters() && (
                        <button onClick={onReset} className="text-xs text-red-600 hover:text-red-700 dark:text-red-400">
                            Reset
                        </button>
                    )}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="lg:hidden p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    >
                        <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Filters Content */}
            <div className={`space-y-5 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                {/* Level Filter */}
                <div>
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-3">Level</h4>
                    <div className="space-y-2">
                        {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as RecommendationLevel[]).map(level => (
                            <label key={level} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.level?.includes(level) || false}
                                    onChange={() => handleLevelChange(level)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white capitalize">
                                    {level.toLowerCase()}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Duration Filter */}
                <div>
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-3">Duration</h4>
                    <div className="space-y-2">
                        {[
                            { value: 'SHORT', label: '< 1 month' },
                            { value: 'MEDIUM', label: '1-3 months' },
                            { value: 'LONG', label: '3-6 months' },
                            { value: 'EXTENDED', label: '> 6 months' }
                        ].map(duration => (
                            <label key={duration.value} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.duration?.includes(duration.value) || false}
                                    onChange={() => handleDurationChange(duration.value)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                    {duration.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div>
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-3">Price</h4>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="price"
                                checked={filters.priceMode === 'ALL' || !filters.priceRange}
                                onChange={() => handlePriceChange('ALL')}
                                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                All prices
                            </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="price"
                                checked={filters.priceMode === 'FREE'}
                                onChange={() => handlePriceChange('FREE')}
                                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                Free only
                            </span>
                        </label>
                    </div>
                </div>

                {/* Provider Filter */}
                <div>
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-3">Provider</h4>
                    <div className="space-y-2">
                        {(['COURSERA' , 'UDEMY' , 'LINKEDIN' , 'AWS' , 'GOOGLE' , 'MICROSOFT'] as RecommendationProvider[]).map(provider => (
                            <label key={provider} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.providers?.includes(provider) || false}
                                    onChange={() => handleProviderChange(provider)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                    {provider.toLowerCase()}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}