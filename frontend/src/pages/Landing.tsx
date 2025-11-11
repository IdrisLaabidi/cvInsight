/*import {Link} from "react-router";

export default function Landing() {
    return (
        <>
            <ul>
                <li><Link to="/signin">Sign In</Link></li>
                <li> <Link to="/signup">Sign Up</Link></li>
            </ul>
        </>
    );
}*/
import React from "react";
import { Link } from 'react-router';
import TypewriterText from "../components/common/TypewriterText.tsx";

const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-100 to-blue-50 rounded-br-full transform -translate-x-32 -translate-y-32"></div>
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full transform translate-x-32 -translate-y-16"></div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    {/* ✅ Logo image replacing BarChart3 */}
                    <Link to="/" className="block mb-0">
                        <img
                            width={231}
                            height={48}
                            src="/images/logo/auth-logo.svg"
                            alt="Logo"
                            className="object-contain"
                        />
                    </Link>
                    <span className="text-2xl font-bold text-gray-800">CVINSIGHT</span>
                </div>

                <div className="flex items-center space-x-8">
                    <Link to="/features" className="text-gray-600 hover:text-blue-500 transition-colors font-medium">
                        Features
                    </Link>
                    <Link to="/pricing" className="text-gray-600 hover:text-blue-500 transition-colors font-medium">
                        Pricing
                    </Link>
                    <Link to="/docs" className="text-gray-600 hover:text-blue-500 transition-colors font-medium">
                        Documentation
                    </Link>
                    <Link
                        to="/signin"
                        className="px-6 py-2.5 text-gray-600 hover:text-blue-500 transition-colors font-medium"
                    >
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-blue-500 uppercase tracking-wider">WELCOME TO</p>
                            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 leading-tight">
                                CVINSIGHT
                            </h1>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                            TailAdmin is truly modern — a dashboard where elegant design and powerful functionality
                            are fused with developer experience as if it were the most natural thing in the world.
                        </p>
                        <TypewriterText/>
                        <div className="pt-4">
                            <Link
                                to="/signup"
                                className="inline-block px-8 py-3.5 bg-blue-400 hover:bg-blue-500 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Get Started!
                            </Link>
                        </div>
                    </div>

                    {/* Right Illustration Area */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 rounded-full transform translate-x-12 scale-110"></div>

                        <div className="relative z-10 flex items-center justify-center h-96">
                            <div className="w-80 h-64 bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                            {/* Optional: you can also place your logo here instead of BarChart */}
                                            <img
                                                width={32}
                                                height={32}
                                                src="/images/logo/auth-logo.svg"
                                                alt="Small Logo"
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-3 bg-blue-100 rounded w-3/4 mb-2"></div>
                                            <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-4">
                                        <div className="h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg"></div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="h-12 bg-blue-50 rounded-lg"></div>
                                            <div className="h-12 bg-blue-50 rounded-lg"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-lg shadow-lg transform rotate-12 hover:rotate-0 transition-transform"></div>
                            <div className="absolute bottom-10 left-10 w-12 h-12 bg-blue-400 rounded-full shadow-lg animate-pulse"></div>
                            <div className="absolute top-1/2 right-0 w-8 h-8 bg-white rounded-full shadow-lg"></div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-500 to-transparent opacity-30 rounded-b-full"></div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-8 py-8">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500">© 2025 CVInsight. All rights reserved.</p>
                        <div className="flex items-center space-x-6">
                            <Link to="/privacy" className="text-gray-500 hover:text-blue-500 transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-gray-500 hover:text-blue-500 transition-colors">
                                Terms
                            </Link>
                            <Link to="/contact" className="text-gray-500 hover:text-blue-500 transition-colors">
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
