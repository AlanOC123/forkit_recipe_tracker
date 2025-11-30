import api from '../api';
import { setTokens, clearTokens } from './tokenService';

const ENDPOINTS = {
    REGISTER: '/api/register/',
    LOGIN: '/api/token/',
    CURRENT_USER: 'api/me/'
}

export const getCurrentUser = async () => {
    const { data } = await api.get(ENDPOINTS.CURRENT_USER);
    return data;
}

export const register = async (userData) => {
    const { data } = await api.post(ENDPOINTS.REGISTER, userData);
    const { user, tokens, message } = data;
    const { access, refresh } = tokens;
    const { id, username, email } = user;

    setTokens(access, refresh)

    return { id, username, email, message }
}

export const login = async (credientials) => {
    const { data } = await api.post(ENDPOINTS.LOGIN, credientials);
    const { access, refresh, username, email, user_id } = data;

    setTokens(access, refresh);

    return { id: user_id, username, email }
}

export const logout = () => clearTokens();