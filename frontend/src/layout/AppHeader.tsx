import { useSidebar } from "../context/SidebarContext";
import { Link } from "react-router";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import UserDropdown from "../components/header/UserDropdown";

const AppHeader: React.FC = () => {
    const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

    const handleToggle = () => {
        if (window.innerWidth >= 991) toggleSidebar();
        else toggleMobileSidebar();
    };

    return (
        <header className="sticky top-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-[99999]">
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">

                {/* Sidebar Toggle */}
                <button
                    onClick={handleToggle}
                    aria-label="Toggle Sidebar"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {isMobileOpen ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    )}
                </button>

                {/* Centered Logo with Subtitle */}
                <Link to="/home" className="flex flex-col items-start">
                    <span className="font-bold text-2xl text-[#0A2A5E] dark:text-white">
                        CVInsight
                    </span>
                    <span className="text-sm font-semibold text-[#1A75D1]">
                        Build Your Future
                    </span>
                </Link>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    <ThemeToggleButton />
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
