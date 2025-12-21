const ENDPOINTS = Object.freeze({
    AUTH: {
        REGISTER: '/api/register',
        LOGIN: '/api/login',
        CURRENT_USER: '/api/me'
    }
})

export const getAuthEndpoints = () => ({ ...ENDPOINTS.AUTH });