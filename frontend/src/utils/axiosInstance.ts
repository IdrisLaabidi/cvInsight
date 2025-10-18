import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const excludedUrls = ["/auth/login", "/auth/register"];

axiosInstance.interceptors.request.use(
    (config) => {
        // Check if the request URL is excluded
        const isExcluded = excludedUrls.some((url) => config.url?.includes(url));
        if (!isExcluded) {
            const token = localStorage.getItem("jwt");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        console.log("Request Sent:", config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response Received:', response);
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            console.log('Unauthorized access, redirecting to login...');
            // history.push('/login'); // Example with React Router
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;