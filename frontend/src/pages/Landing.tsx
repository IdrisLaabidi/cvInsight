import { Link } from "react-router";
import { FileText, Target, Upload, Sparkles, ChevronDown } from "lucide-react";
import ThemeTogglerTwo from "../components/common/ThemeTogglerTwo.tsx";
import Logo from "../components/common/Logo.tsx";
import TypewriterText from "../components/common/TypewriterText.tsx";
import myGif from "../assets/animation.gif";

const Landing = () => {
    const scrollToSection = (id: any) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
            {/* Theme toggle */}
            <div className="fixed z-50 bottom-6 right-6">
                <ThemeTogglerTwo />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3">
                        <Logo />
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection("features")}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection("how-it-works")}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                            How It Works
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/signin"
                            className="px-6 py-2.5 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 rounded-full"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-8 overflow-hidden">
                <div
                    aria-hidden
                    className="absolute top-0 left-0 w-full h-96 rounded-br-full transform -translate-x-32 -translate-y-32 bg-gradient-to-br from-blue-400 to-blue-50 dark:from-gray-800 dark:to-gray-900"
                />
                <div
                    aria-hidden
                    className="absolute top-20 right-0 w-96 h-96 rounded-full transform translate-x-32 -translate-y-16 bg-blue-50 dark:bg-gray-800"
                />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 pt-7">
                            <div className="space-y-2">
                                <p className="text-lg font-semibold text-blue-500 uppercase tracking-wider">
                                    WELCOME TO
                                </p>
                                <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-white leading-tight">
                                    CVInsight
                                </h1>
                            </div>

                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                                Where simplicity meets efficacy — the ultimate solution for crafting professional CVs
                                that unlock career opportunities.
                            </p>

                            <TypewriterText />

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Get Started Free
                                    <ChevronDown className="ml-2 w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => scrollToSection("features")}
                                    className="inline-flex items-center px-8 py-3.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div
                                aria-hidden
                                className="absolute inset-0 rounded-full transform translate-x-12 scale-110 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900"
                            />

                            <div className="relative z-10 flex items-center justify-center h-96">
                                <img
                                    src={myGif}
                                    alt="animated illustration"
                                    width="400"
                                    className="max-w-full h-auto object-contain filter transition-all duration-300 dark:brightness-90 dark:contrast-95"
                                />

                                <div
                                    className="absolute top-10 right-10 w-16 h-16 rounded-lg transform rotate-12 hover:rotate-0 transition-transform shadow-lg bg-white dark:bg-gray-700"
                                    aria-hidden
                                />
                                <div
                                    className="absolute bottom-10 left-10 w-12 h-12 rounded-full animate-pulse shadow-lg bg-blue-400 dark:bg-blue-600"
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

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                </div>
            </section>

            {/* Full Width Image Section 1 - After Hero */}
            <section className="py-12 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        {/* Replace src with your image */}
                        <img
                            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop"
                            alt="Professional workspace"
                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 flex items-center justify-center">
                            <div className="text-center text-white px-8">
                                <h3 className="text-4xl font-bold mb-4">Built for Modern Job Seekers</h3>
                                <p className="text-xl max-w-2xl mx-auto">
                                    Trusted by thousands of professionals worldwide to land their dream jobs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-8 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Everything you need to create, analyze, and optimize your resume for success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Resume Building */}
                        <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FileText className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                Professional Resume Building
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Create stunning, ATS-friendly resumes with our intuitive builder. Choose from professionally designed templates and customize every detail to match your unique career story.
                            </p>
                        </div>

                        {/* Resume Analysis */}
                        <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                AI-Powered Resume Analysis
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Get instant feedback on your resume with our advanced AI analysis. Receive detailed insights on formatting, content quality, and ATS compatibility.
                            </p>
                        </div>

                        {/* Targeted Recommendations */}
                        <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Target className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                Targeted Recommendations
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Boost your career with tailored recommendations for courses, certifications, training programs, and job opportunities. Our AI suggest relevant skill-building resources and career advancement paths that align with your professional goals and industry trends.                            </p>
                        </div>

                        {/* Upload & Reformulation */}
                        <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                Smart Upload & Reformulation
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Already have a resume? Upload it and let our AI extract and reformulate your content automatically. Transform outdated formats into modern designs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Half Width Image Section - Split Content */}
            <section className="py-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                                Resume Analysis That Makes a Difference
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Receive a comprehensive resume score with detailed analysis. Our AI identifies mistakes, highlights weak points that need improvement, and recognizes your strong points to emphasize. Get instant, actionable feedback on structure, content quality and ATS compatibility to perfect your resume.                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">ATS compatibility scoring</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">Content quality assessment</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">Weak point analysis with improvement tips</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            {/* Replace src with your image */}
                            <img
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop"
                                alt="Resume analysis dashboard"
                                className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 dark:bg-blue-600 rounded-2xl -z-10" />
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500 dark:bg-purple-600 rounded-full -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 px-8 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Get started in three simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                Create or Upload
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Start from scratch with our builder or upload your existing resume for instant reformulation
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                                2
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                Analyze & Optimize
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Get AI-powered insights and recommendations to make your resume stand out
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                Apply & Succeed
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Download your polished resume and apply to targeted job opportunities with confidence
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Half Width Image Section - Reversed Layout */}
            <section className="py-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative order-2 md:order-1">
                            {/* Replace src with your image */}
                            <img
                                src="https://s0.hfdstatic.com/sites/the_hartford/pubimgs/1444654741163.jpg?v=2022-06-22_115016289
"
                                alt="Team collaboration"
                                className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500 dark:bg-green-600 rounded-2xl -z-10" />
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-500 dark:bg-orange-600 rounded-full -z-10" />
                        </div>
                        <div className="space-y-6 order-1 md:order-2">
                            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                                Personalized Job Matching
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Don't waste time applying to irrelevant positions. Our smart algorithm matches you with opportunities that align with your skills, experience, and career goals.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">Real-time job recommendations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">Industry-specific insights</span>
                                </li>
                                {/*<li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">Application tracking and reminders</span>
                                </li>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Width Image Section 2 - Before CTA */}
            <section className="py-12 px-8 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                        {/* Replace src with your image */}
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop"
                            alt="Success story"
                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-blue-600/80 flex items-center justify-center">
                            <div className="text-center text-white px-8">
                                <h3 className="text-4xl font-bold mb-4">Join 50,000+ Success Stories</h3>
                                <p className="text-xl max-w-2xl mx-auto">
                                    Professionals worldwide trust CVInsight to advance their careers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Career?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of professionals who have landed their dream jobs with CVInsight
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/signup"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Start Free Today
                        </Link>
                        <Link
                            to="/signin"
                            className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-blue-600"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <Logo />
                            <p className="text-gray-600 dark:text-gray-400 mt-4">
                                Your career success partner
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Product</h4>
                            <div className="space-y-2">
                                <button onClick={() => scrollToSection("features")} className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Features
                                </button>
                                <button onClick={() => scrollToSection("how-it-works")} className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    How It Works
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Company</h4>
                            <div className="space-y-2">
                                <Link to="/about" className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    About
                                </Link>
                                <Link to="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Legal</h4>
                            <div className="space-y-2">
                                <Link to="/privacy" className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Privacy
                                </Link>
                                <Link to="/terms" className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Terms
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            © 2025 CVInsight. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
