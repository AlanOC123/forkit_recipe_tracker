const ENDPOINTS = Object.freeze({
    AUTH: {
        REGISTER: '/api/register/',
        REGISTRATION_OPTIONS: '/api/register/options/',
        LOGIN: '/api/token/',
        CURRENT_USER: '/api/me/'
    }
})

export const getAuthEndpoints = () => ({ ...ENDPOINTS.AUTH });