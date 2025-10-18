import {Link, useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import PageMeta from "../../components/common/PageMeta.tsx";
import GridShape from "../../components/common/GridShape.tsx";


export default function LoginSuccessful() {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const jwt = params.get("token");

        if (jwt) {
            setToken(jwt);
            localStorage.setItem("jwt", jwt);

            setTimeout(()=> {
                navigate("/dashboard");
            }, 3000);
        } else {
            setError(true);
        }
    }, [location,navigate]);

    if (error) {
        return (
            <>
                <PageMeta
                    title="Login Error | CvInsight"
                    description="Token not found after OAuth2 login"
                />
                <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
                    <GridShape />
                    <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                        <h1 className="mb-6 font-bold text-red-600 text-title-md dark:text-red-400 xl:text-title-2xl">
                            Login Failed
                        </h1>

                        <p className="mt-6 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
                            No token was found in the URL. Please try logging in again.
                        </p>

                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                        >
                            Go Back to Login
                        </Link>
                    </div>

                    <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} - CvInsight
                    </p>
                </div>
            </>
        );
    }

    // Render success page if token exists
    return (
        <>
            <PageMeta
                title="Login Successful | CvInsight"
                description="You have successfully logged in using OAuth2"
            />
            <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
                <GridShape />
                <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                    <h1 className="mb-6 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
                        Login Successful!
                    </h1>

                    <img
                        src="/images/success.svg"
                        alt="Success"
                        className="mx-auto dark:hidden"
                    />
                    <img
                        src="/images/success-dark.svg"
                        alt="Success"
                        className="hidden dark:block mx-auto"
                    />

                    <p className="mt-6 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg break-words">
                        Your token:
                        <br />
                        <code className="text-sm text-gray-900 dark:text-white">{token}</code>
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                    >
                        Go to Home / Dashboard
                    </Link>
                </div>

                <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} - CvInsight
                </p>
            </div>
        </>
    );
}