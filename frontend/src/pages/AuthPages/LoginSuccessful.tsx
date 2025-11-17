import { useLocation, useNavigate ,Link} from "react-router";
import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import Logo from "../../components/common/Logo";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function LoginSuccessful() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const jwt = params.get("token");

        if (jwt) {
            localStorage.setItem("jwt", jwt);

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } else {
            setError(true);
        }
    }, [location, navigate]);

    if (error) {
        return (
            <>
                <PageMeta
                    title="Login Error | CVInsight"
                    description="Token not found after OAuth login"
                />

                <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">

                    {/* Background Gradients / Blobs */}
                    <div aria-hidden className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-red-300 to-red-500 opacity-20 rounded-full blur-3xl -translate-x-40 -translate-y-40" />
                    <div aria-hidden className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-red-200 dark:bg-red-900 opacity-10 rounded-full blur-3xl translate-x-32 translate-y-20" />

                    {/* Theme Toggle */}
                    <div className="fixed bottom-6 right-6 z-50">
                        <ThemeTogglerTwo />
                    </div>

                    {/* Logo */}
                    <div className="mb-6">
                        <Logo />
                    </div>

                    <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
                        Login Failed
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 max-w-md text-center mb-6">
                        No token was found in the URL. Please try logging in again.
                    </p>

                    <Link
                        to="/SignIn"
                        className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-400 text-white font-semibold transition shadow-lg"
                    >
                        Back to Login
                    </Link>
                </div>
            </>
        );
    }

    // SUCCESS SCREEN
    return (
        <>
            <PageMeta
                title="Login Successful | CVInsight"
                description="Authentication completed"
            />

            <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">

                {/* Background Gradients */}
                <div aria-hidden className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-300 to-blue-500 opacity-20 rounded-full blur-3xl -translate-x-40 -translate-y-40" />
                <div aria-hidden className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-200 dark:bg-gray-800 opacity-10 rounded-full blur-3xl translate-x-32 translate-y-20" />

                {/* Theme Toggle */}
                <div className="fixed bottom-6 right-6 z-50">
                    <ThemeTogglerTwo />
                </div>

                {/* Logo */}
                <div className="mb-6">
                    <Logo />
                </div>

                {/* Success Icon */}
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-xl animate-pulse mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Text */}
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Login Successful!
                </h1>

                <p className="text-gray-600 dark:text-gray-400 text-lg text-center max-w-md">
                    You’re being redirected to your dashboard...
                </p>

                {/* Small Spinner */}
                <div className="mt-6">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        </>
    );
}
