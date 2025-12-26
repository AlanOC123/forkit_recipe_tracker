const ENDPOINTS = Object.freeze({
    BASE: import.meta.env.VITE_API_BASE_URL,
    AUTH: {
        REGISTER: "/api/register/",
        REGISTRATION_OPTIONS: "/api/register/options/",
        LOGIN: "/api/token/",
        CURRENT_USER: "/api/me/",
    },
});

export const getBaseURL = () => ENDPOINTS.BASE;
export const getAuthEndpoints = () => ({ ...ENDPOINTS.AUTH });