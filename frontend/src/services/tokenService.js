import { jwtDecode } from 'jwt-decode';

const STORAGE_KEYS = {
    ACCESS: 'access',
    REFRESH: 'refresh'
}

const getAccessToken = () => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS)
}

const getRefreshToken = () => {
    return localStorage.getItem(STORAGE_KEYS.REFRESH);
}

const setAccessToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS, token);
    return localStorage.getItem(STORAGE_KEYS.ACCESS);
};

const setRefreshToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.REFRESH, token);
    return localStorage.getItem(STORAGE_KEYS.REFRESH);
};

export const getTokens = () => ({ access: getAccessToken(), refresh: getRefreshToken() })

export const setTokens = (accessToken, refreshToken) => (setAccessToken(accessToken) && setRefreshToken(refreshToken));

export const clearTokens = () => {
    Object.values(STORAGE_KEYS).forEach(v => localStorage.removeItem(v));
    return !(getAccessToken() && getRefreshToken());
}

export const isTokenUsable = (token) => {
    try {
        if (!token) return false;
        const { exp } = jwtDecode(token)
        return exp >= (Date.now() / 1000) + 1
    } catch (err) {
        console.error(err);
        return false
    }
}