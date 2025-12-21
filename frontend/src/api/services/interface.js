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
        if (ACCESS) config.headers.Authorization = `Bearer: ${ACCESS}`;
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
        if (error.response?.status !== 401) { return Promise.reject(error) }

        const { REFRESH } = getTokens();

        if (!isTokenUseable(REFRESH)) {
            clearTokens();
            return Promise.reject(error)
        }

        const newAccessToken = await refreshAccessToken();
        setTokens(newAccessToken, REFRESH);

        return instance(error.config);
    }
)

export default instance;