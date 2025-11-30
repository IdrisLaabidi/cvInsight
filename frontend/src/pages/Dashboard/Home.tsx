import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, Edit, BarChart2, Trash2, Plus, Upload, FileText, Calendar, TrendingUp } from 'lucide-react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import axiosInstance from "../../utils/axiosInstance";

// Types
interface Resume {
    id: string;
    contentType: string;
    fileData: string;
    filename: string;
    jsonContent: JSON;
    origin: string;
    size: number;
    uploadedAt: string;
    score?: number;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[] >([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Fetch resumes from API
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        axiosInstance
            .get('/resume', {
                timeout: 0,
            })
            .then(response => {
                console.log(response);
                setResumes(response.data);
            })
            .catch(error => {
                console.error('Error fetching resumes:', error);
                setError(error.response?.data?.error || "Failed to load resumes. Please try again.");
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/resume/${id}`, { timeout: 0 });
            setResumes(prev => prev.filter(r => r.id !== id));
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting resume:', error);
            setError("Failed to delete resume. Please try again.");
        }
    };

    const handleView = (id: string) => {
        navigate(`/resume/view/${id}`);
    };

    const handleSendToBuilder = (id: string) => {
        navigate(`/resume/builder/${id}`);
    };

    const handleSendToAnalyzer = (id: string) => {
        navigate(`/resume/analyzer/${id}`);
    };

    const filteredResumes = resumes.filter(resume =>
        resume?.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = [
        {
            label: 'Total Resumes',
            value: resumes.length,
            icon: <FileText className="w-6 h-6" />,
            color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        },
        {
            label: 'Avg. Score',
            value: resumes.length > 0
                ? Math.round(resumes.reduce((acc, r) => acc + (r.score || 0), 0) / resumes.length)
                : 0,
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
        },
        {
            label: 'Last Updated',
            value: resumes.length > 0
                ? new Date(Math.max(...resumes.map(r => new Date(r.uploadedAt).getTime()))).toLocaleDateString()
                : 'N/A',
            icon: <Calendar className="w-6 h-6" />,
            color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
        },
    ];

    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Dashboard" />

            {/* Page Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Resumes</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage and track all your resumes in one place
                    </p>
                </div>

                {/* Add Resume Button with Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowAddMenu(!showAddMenu)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Resume
                    </button>

                    {showAddMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowAddMenu(false)}
                            />
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                                <Link
                                    to="/resume/upload"
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setShowAddMenu(false)}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Upload Resume</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Extract from existing file</p>
                                    </div>
                                </Link>
                                <Link
                                    to="/resume/builder"
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setShowAddMenu(false)}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                        <Edit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Resume Builder</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Create from scratch</p>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search resumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Resumes List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {isLoading ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-6 animate-pulse">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                    </div>
                                </div>
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
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Error Loading Resumes</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredResumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {searchQuery ? 'No resumes found' : 'No resumes yet'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {searchQuery ? 'Try adjusting your search query' : 'Create your first resume to get started'}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => setShowAddMenu(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Resume
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredResumes.map((resume) => (
                            <div
                                key={resume.id}
                                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    {/* Resume Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                {resume.filename.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                                    {resume.filename}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        Modified: {new Date(resume.uploadedAt).toLocaleDateString()}
                                                    </span>
                                                    {resume.score && (
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                            resume.score >= 80
                                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                                : resume.score >= 60
                                                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                                                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                        }`}>
                                                            Score: {resume.score}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleView(resume.id)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                            title="View Resume"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span className="hidden sm:inline">View</span>
                                        </button>
                                        <button
                                            onClick={() => handleSendToBuilder(resume.id)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                            title="Edit in Builder"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleSendToAnalyzer(resume.id)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                                            title="Analyze Resume"
                                        >
                                            <BarChart2 className="w-4 h-4" />
                                            <span className="hidden sm:inline">Analyze</span>
                                        </button>

                                        {deleteConfirm === resume.id ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDelete(resume.id)}
                                                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(resume.id)}
                                                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                                title="Delete Resume"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span className="hidden sm:inline">Delete</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Count */}
            {!isLoading && filteredResumes.length > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Showing {filteredResumes.length} of {resumes.length} resumes
                </p>
            )}
        </div>
    );
}