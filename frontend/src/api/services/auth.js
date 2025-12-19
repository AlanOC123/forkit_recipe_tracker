import apiInterface from "./interceptor";
import { setTokens, clearTokens } from "./tokens";
import { endpointsAPI } from "../constants";

const ENDPOINTS = endpointsAPI.getAuthEndpoints();

const getCurrentUserRequest = async () => {
    const { data } = await apiInterface.get(ENDPOINTS.CURRENT_USER);
    return data;
}

const postRegisterRequest = async (userData) => {
    const { data } = await apiInterface.post(ENDPOINTS.REGISTER, userData);
    const { user, tokens, message } = data;
    const { access, refresh } = tokens;
    const { id, username, email } = user;

    setTokens(access, refresh);

    return { id, username, email, message }
}

const postLoginRequest = async(userData) => {
    const { data } = await apiInterface.post(ENDPOINTS.LOGIN, userData);
    const { access, refresh, username, email, user_id } = data;

    setTokens(access, refresh);
    return { id: user_id, username, email }
}

export const logoutUser = () => clearTokens();

const authAPI = {
    getCurrentUserRequest,
    postRegisterRequest,
    postLoginRequest,
    logoutUser
}

export default authAPI;
