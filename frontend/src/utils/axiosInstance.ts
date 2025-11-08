import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const excludedUrls = ["/auth/login", "/auth/register", "/auth/login"];

let isRefreshing = false;
// Array to store pending requests while token is being refreshed
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    (config) => {
        const isExcluded = excludedUrls.some((url) => config.url?.includes(url));
        if (!isExcluded) {
            const token = localStorage.getItem("jwt");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            const isExcluded = excludedUrls.some((url) => originalRequest.url?.includes(url));

            if (isExcluded) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("jwt");

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post(`${baseURL}/auth/refresh`, {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                });

                const newToken = response.data.access_token || response.data.token;

                if (newToken) {
                    localStorage.setItem("jwt", newToken);

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    processQueue(null, newToken);

                    return axiosInstance(originalRequest);
                } else {
                    throw new Error('No new token received');
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem("jwt");

                console.log('Token refresh failed, redirecting to login...');
                // history.push('/login'); // Example with React Router
                // window.location.href = '/login'; // Alternative redirect

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;