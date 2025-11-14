import React from "react";
import { Link } from "react-router";
import myGif from "../assets/animation.gif";
import TypewriterText from "../components/common/TypewriterText.tsx";
import Logo from "../components/common/Logo.tsx";
import ThemeTogglerTwo from "../components/common/ThemeTogglerTwo"; // added toggler

const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors">
            {/* Decorative background blobs */}
            <div
                aria-hidden
                className="absolute top-0 left-0 w-full h-96 rounded-br-full transform -translate-x-32 -translate-y-32
                   bg-gradient-to-br from-blue-400 to-blue-50 dark:from-gray-800 dark:to-gray-900"
            />
            <div
                aria-hidden
                className="absolute top-20 right-0 w-96 h-96 rounded-full transform translate-x-32 -translate-y-16
                   bg-blue-50 dark:bg-gray-800"
            />

            {/* Theme toggle (fixed like your Auth layout) */}
            <div className="fixed z-50 bottom-6 right-6 sm:block">
                <ThemeTogglerTwo />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-start justify-between pr-8 pl-1 py-5.5 max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    <Link to="/" className="block mb-0">
                        <Logo />
                    </Link>
                </div>

                <div className="flex items-center space-x-8">
                    <Link
                        to="/features"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        Features
                    </Link>
                    <Link
                        to="/pricing"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        Pricing
                    </Link>
                    <Link
                        to="/docs"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        Documentation
                    </Link>
                    <Link
                        to="/signin"
                        className="px-6 py-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-6 pb-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-lg font-semibold text-blue-500 uppercase tracking-wider">
                                WELCOME TO
                            </p>

                            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-white leading-tight">
                                CVInsight
                            </h1>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                            Where simplicity meets efficacity — the ultimate solution for crafting professional CVs
                            that unlock career opportunities.
                        </p>

                        <TypewriterText />

                        <div className="pt-4">
                            <Link
                                to="/signup"
                                className="inline-block px-8 py-3.5 bg-blue-500 hover:bg-blue-400 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Get Started!
                            </Link>
                        </div>
                    </div>

                    {/* Right Illustration Area */}
                    <div className="relative">
                        <div
                            aria-hidden
                            className="absolute inset-0 rounded-full transform translate-x-12 scale-110
                         bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400
                         dark:from-gray-700 dark:via-gray-800 dark:to-gray-900"
                        />

                        <div className="relative z-10 flex items-center justify-center h-96">
                            <img
                                src={myGif}
                                alt="animated illustration"
                                width="400"
                                className="max-w-full h-auto object-contain filter transition-all duration-300
                           dark:brightness-90 dark:contrast-95"
                            />

                            <div
                                className="absolute top-10 right-10 w-16 h-16 rounded-lg transform rotate-12 hover:rotate-0
                           transition-transform shadow-lg bg-white dark:bg-gray-700"
                                aria-hidden
                            />
                            <div
                                className="absolute bottom-10 left-10 w-12 h-12 rounded-full animate-pulse shadow-lg
                           bg-blue-400 dark:bg-blue-600"
                                aria-hidden
                            />
                            <div
                                className="absolute top-1/2 right-0 w-8 h-8 rounded-full shadow-lg bg-white dark:bg-gray-700"
                                aria-hidden
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-500 to-transparent opacity-30 rounded-b-full dark:from-gray-800 dark:opacity-25" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 mt-0">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 dark:text-gray-400">© 2025 CVInsight. All rights reserved.</p>

                        <div className="flex items-center space-x-6">
                            <Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                Terms
                            </Link>
                            <Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
