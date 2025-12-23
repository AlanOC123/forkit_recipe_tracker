import { getTokens, isTokenUseable, clearTokens, setTokens } from "./tokens";
import { refreshAccessToken } from '../utils';
import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

instance.interceptors.request.use(
    (config) => {
        const { ACCESS } = getTokens();
        if (ACCESS) config.headers.Authorization = `Bearer ${ACCESS}`;
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalConfig = error.config;

        if (error.response?.status === 401 && !originalConfig.retry) { 
            originalConfig._retry = false

            try {
                const { REFRESH } = getTokens();

                if (!isTokenUseable(REFRESH)) {
                    clearTokens();
                    return Promise.reject(error);
                }

                const newAccessToken = await refreshAccessToken();
                setTokens(newAccessToken, REFRESH);

                return instance(originalConfig);
            } catch (refreshError) {
                clearTokens()
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error);
    }
)

export default instance;