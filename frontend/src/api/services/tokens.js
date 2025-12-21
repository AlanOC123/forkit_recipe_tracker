import { jwtDecode } from "jwt-decode";

const STORAGE_KEYS = {
    ACCESS: "access",
    REFRESH: "refresh",
};

const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS);
const getRefreshToken = () => localStorage.getItem(STORAGE_KEYS.REFRESH);

const setAccessToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS, token);
    return localStorage.getItem(STORAGE_KEYS.ACCESS);
};

const setRefreshToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.REFRESH, token);
    return localStorage.getItem(STORAGE_KEYS.REFRESH);
};

export const getTokens = () => ({
    ACCESS: getAccessToken(),
    REFRESH: getRefreshToken(),
});

export const setTokens = (accessToken, refreshToken) =>
    setAccessToken(accessToken) && setRefreshToken(refreshToken);

export const clearTokens = () => {
    Object.values(STORAGE_KEYS).forEach((token) => localStorage.removeItem(token));
    return !(getAccessToken() && getRefreshToken())
}

export const isTokenUseable = (token) => {
    try {
        if (!token) return false;
        const { exp } = jwtDecode(token);
        console.log(exp)
        return exp >= (Date.now() / 1000) + 1;
    } catch (err) {
        console.error(err);
        return false
    }
}

const tokensService = {
    getTokens,
    setTokens,
    clearTokens,
    isTokenUseable,
};

export default tokensService;