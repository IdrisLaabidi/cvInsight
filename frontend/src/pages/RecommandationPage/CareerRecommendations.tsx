import {useState, useEffect, JSX} from 'react';
import { Recommendation, CVSummary, RecommendationFilters, RecommendationType } from '../../types/recommendation.types';
import { recommendationService } from '../../services/recommendationService';
import CVSelector from '../../components/career/CVSelector';
import RecommendationCard from '../../components/career/RecommendationCard';
import RecommendationFiltersComponent from '../../components/career/RecommendationFilters';
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";

const TABS: { key: RecommendationType | 'all'; label: string; icon: JSX.Element }[] = [
    { key: 'all', label: 'All', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    { key: 'course', label: 'Courses', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { key: 'certification', label: 'Certifications', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> },
    { key: 'training', label: 'Training', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
    { key: 'opportunity', label: 'Opportunities', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
];

export default function CareerRecommendations() {
    const [cvList, setCvList] = useState<CVSummary[]>([]);
    const [selectedCV, setSelectedCV] = useState<CVSummary | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [activeTab, setActiveTab] = useState<RecommendationType | 'all'>('all');
    const [filters, setFilters] = useState<RecommendationFilters>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoadingCVs, setIsLoadingCVs] = useState(true);
    const [isLoadingRecs, setIsLoadingRecs] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoadingCVs(true);

        recommendationService.getUserCVs()
            .then(cvs => {
                setCvList(cvs);
                if (cvs.length > 0) setSelectedCV(cvs[0]);
            })
            .catch(err => {
                console.error('Error fetching CVs:', err);
                setError('Failed to load your CVs');
            })
            .finally(() => setIsLoadingCVs(false));
    }, []);

    useEffect(() => {
        if (!selectedCV) return;

        setIsLoadingRecs(true);
        setError(null);

        recommendationService.getRecommendations(/*selectedCV.id, filters*/)
            .then(recs => setRecommendations(recs))
            .catch(err => {
                console.error('Error fetching recommendations:', err);
                setError('Failed to load recommendations');
            })
            .finally(() => setIsLoadingRecs(false));
    }, [selectedCV, filters]);

    const handleSaveRecommendation = async (id: string) => {
        try {
            //await recommendationService.saveRecommendation(id);
            setRecommendations(prev => prev.map(r => r.id === id ? { ...r, isSaved: true } : r));
        } catch (err) { console.error('Error saving:', err); }
    };

    const handleUnsaveRecommendation = async (id: string) => {
        try {
            //await recommendationService.unsaveRecommendation(id);
            setRecommendations(prev => prev.map(r => r.id === id ? { ...r, isSaved: false } : r));
        } catch (err) { console.error('Error unsaving:', err); }
    };

    const handleResetFilters = () => {
        setFilters({});
        setSearchQuery('');
    };

    // Filtrer les recommandations
    const filteredRecommendations = recommendations.filter(rec => {
        if (activeTab !== 'all' && rec.type !== activeTab) return false;
        return !(searchQuery && !rec.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !rec.description.toLowerCase().includes(searchQuery.toLowerCase()));

    });

    // Compter par type
    const getCounts = () => {
        const counts: Record<string, number> = { all: recommendations.length };
        recommendations.forEach(r => { counts[r.type] = (counts[r.type] || 0) + 1; });
        return counts;
    };
    const counts = getCounts();

    return (

        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Recommendations" />
            {/* Page Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Recommendations</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Personalized suggestions based on your CV analysis
                    </p>
                </div>
                <button
                    onClick={() => selectedCV && setFilters({ ...filters })}
                    disabled={!selectedCV || isLoadingRecs}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <svg className={`w-5 h-5 ${isLoadingRecs ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {/* CV Selector */}
            <CVSelector
                cvList={cvList}
                selectedCV={selectedCV}
                onSelectCV={setSelectedCV}
                isLoading={isLoadingCVs}
            />

            {/* Main Content */}
            {selectedCV && (
                <>
                    {/* Search & Tabs */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search recommendations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-x-auto">
                            {TABS.map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                        activeTab === tab.key
                                            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                                        activeTab === tab.key
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                                    }`}>
                                        {counts[tab.key] || 0}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Filters Sidebar */}
                        <div className="lg:w-64 flex-shrink-0">
                            <RecommendationFiltersComponent
                                filters={filters}
                                onFiltersChange={setFilters}
                                onReset={handleResetFilters}
                            />
                        </div>

                        {/* Recommendations Grid */}
                        <div className="flex-1">
                            {isLoadingRecs ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 animate-pulse">
                                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                                        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">{error}</p>
                                </div>
                            ) : filteredRecommendations.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">No recommendations found</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or search query</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {filteredRecommendations.map(rec => (
                                        <RecommendationCard
                                            key={rec.id}
                                            recommendation={rec}
                                            onSave={handleSaveRecommendation}
                                            onUnsave={handleUnsaveRecommendation}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Results Count */}
                            {!isLoadingRecs && !error && filteredRecommendations.length > 0 && (
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Showing {filteredRecommendations.length} of {recommendations.length} recommendations
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}