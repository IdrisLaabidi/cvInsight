import { CVSummary } from '../../types/recommendation.types';

interface CVSelectorProps {
    cvList: CVSummary[];
    selectedCVs: CVSummary[] | CVSummary | null;
    onSelectCV: (cv: CVSummary | CVSummary[]) => void;
    isLoading: boolean;
    multiSelect?: boolean;
}

export default function CVSelector({
                                       cvList,
                                       selectedCVs,
                                       onSelectCV,
                                       isLoading,
                                       multiSelect = false
                                   }: CVSelectorProps) {
    const isSelected = (cvId: string): boolean => {
        if (multiSelect) {
            return Array.isArray(selectedCVs) && selectedCVs.some(cv => cv.id === cvId);
        }
        return selectedCVs !== null && !Array.isArray(selectedCVs) && selectedCVs.id === cvId;
    };

    // Helper function to get selected CVs as array
    const getSelectedCVsArray = (): CVSummary[] => {
        if (multiSelect && Array.isArray(selectedCVs)) {
            return selectedCVs;
        }
        if (!multiSelect && selectedCVs && !Array.isArray(selectedCVs)) {
            return [selectedCVs];
        }
        return [];
    };

    // Handle CV selection
    const handleSelectCV = (cv: CVSummary) => {
        if (multiSelect) {
            const currentSelected = Array.isArray(selectedCVs) ? selectedCVs : [];
            const isCurrentlySelected = currentSelected.some(selected => selected.id === cv.id);

            if (isCurrentlySelected) {
                // Remove from selection
                onSelectCV(currentSelected.filter(selected => selected.id !== cv.id));
            } else {
                // Add to selection
                onSelectCV([...currentSelected, cv]);
            }
        } else {
            // Single select mode
            onSelectCV(cv);
        }
    };

    if (isLoading) {
        return (
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-xl animate-pulse">
                            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (cvList.length === 0) {
        return (
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex items-center gap-3 py-4 text-gray-500 dark:text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm">No CVs available</span>
                </div>
            </div>
        );
    }

    const selectedCVsArray = getSelectedCVsArray();
    const selectedCount = selectedCVsArray.length;

    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Select {multiSelect ? 'CVs' : 'a CV'}
                    </h3>
                    {multiSelect && selectedCount > 0 && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                            {selectedCount} selected
                        </p>
                    )}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {cvList.length} CV{cvList.length > 1 ? 's' : ''} available
                </span>
            </div>

            {/* CV List */}
            <div className="space-y-2">
                {cvList.map((cv) => {
                    const selected = isSelected(cv.id);

                    return (
                        <button
                            key={cv.id}
                            onClick={() => handleSelectCV(cv)}
                            className={`w-full flex items-center gap-4 p-4 text-left border-2 rounded-xl transition-all ${
                                selected
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            {/* Checkbox (for multi-select) or Icon (for single select) */}
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${
                                selected
                                    ? 'bg-blue-100 dark:bg-blue-900/30'
                                    : 'bg-gray-100 dark:bg-gray-700'
                            }`}>
                                {multiSelect ? (
                                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                                        selected
                                            ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                                            : 'border-gray-300 dark:border-gray-600'
                                    }`}>
                                        {selected && (
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                                                <path d="M10.293 2.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L5 7.586l5.293-5.293z" />
                                            </svg>
                                        )}
                                    </div>
                                ) : (
                                    <svg className={`w-5 h-5 ${
                                        selected
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                )}
                            </div>

                            {/* CV Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">
                                    {cv.fileName}
                                </h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(cv.uploadedAt).toLocaleDateString()}
                                    </span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {cv.detectedSkills.length} skills
                                    </span>
                                    {cv.mainDomain && (
                                        <>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {cv.mainDomain}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Score Badge */}
                            <div className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                                cv.completenessScore >= 80
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : cv.completenessScore >= 50
                                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                                {cv.completenessScore}%
                            </div>

                            {/* Selected Check (for single select) */}
                            {!multiSelect && selected && (
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Selected CV(s) Details */}
            {selectedCVsArray.length > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
                    {multiSelect && selectedCVsArray.length > 1 ? (
                        // Multi-select summary
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                Selected CVs Summary
                            </h4>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{selectedCVsArray.length}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">CVs</p>
                                </div>
                                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                        {selectedCVsArray.reduce((sum, cv) => sum + cv.detectedSkills.length, 0)}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Skills</p>
                                </div>
                                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                                        {Math.round(selectedCVsArray.reduce((sum, cv) => sum + cv.completenessScore, 0) / selectedCVsArray.length)}%
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Avg Score</p>
                                </div>
                                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                                        {selectedCVsArray.reduce((sum, cv) => sum + (cv.skillGaps?.length || 0), 0)}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Gaps</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Single CV details
                        selectedCVsArray.map((selectedCV) => (
                            <div key={selectedCV.id}>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{selectedCV.completenessScore}%</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Score</p>
                                    </div>
                                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                        <p className="text-xl font-bold text-green-600 dark:text-green-400">{selectedCV.detectedSkills.length}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Skills</p>
                                    </div>
                                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                        <p className="text-sm font-bold text-purple-600 dark:text-purple-400 truncate">{selectedCV.experienceLevel || 'N/A'}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Level</p>
                                    </div>
                                    <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                                        <p className="text-xl font-bold text-red-600 dark:text-red-400">{selectedCV.skillGaps?.length || 0}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Gaps</p>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {selectedCV.detectedSkills.slice(0, 10).map((skill, index) => (
                                        <span key={index} className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                    {selectedCV.detectedSkills.length > 10 && (
                                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                                            +{selectedCV.detectedSkills.length - 10} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}