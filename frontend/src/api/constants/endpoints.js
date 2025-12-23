const ENDPOINTS = Object.freeze({
    AUTH: {
        REGISTER: '/api/register/',
        LOGIN: '/api/token/',
        CURRENT_USER: '/api/me/'
    }
})

export const getAuthEndpoints = () => ({ ...ENDPOINTS.AUTH });