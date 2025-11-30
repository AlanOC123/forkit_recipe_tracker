import { getTokens, isTokenUsable, clearTokens, setTokens } from './services/tokenService'
import { refreshAccessToken } from './utils/refreshToken'
import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

instance.interceptors.request.use(
    (config) => {
        const { access } = getTokens();
        if (access) config.headers.Authorization = `Bearer ${access}`
        return config
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

        const { refresh } = getTokens();

        if (!isTokenUsable(refresh)) {
            clearTokens();
            return Promise.reject(error);
        }

        const newAccessToken = await refreshAccessToken()
        setTokens(newAccessToken, refresh);

        return instance(error.config)
    }
)

export default instance