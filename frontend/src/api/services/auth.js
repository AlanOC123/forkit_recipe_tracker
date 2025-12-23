import interfaceService from "./interface";
import { setTokens, clearTokens } from "./tokens";
import { getAuthEndpoints } from "../constants";

const ENDPOINTS = getAuthEndpoints();

const getCurrentUserRequest = async () => {
    const { data } = await interfaceService.get(ENDPOINTS.CURRENT_USER);
    return data;
};

const postRegisterRequest = async (userData) => {
    const { data } = await interfaceService.post(ENDPOINTS.REGISTER, userData);
    const { user, tokens, message } = data;
    const { access, refresh } = tokens;
    const { id } = user;

    setTokens(access, refresh);

    return { id, message };
};

const postLoginRequest = async (userData) => {
    const { data } = await interfaceService.post(ENDPOINTS.LOGIN, userData);
    const { access, refresh, id } = data;

    setTokens(access, refresh);
    return { id };
};

export const logoutUser = () => clearTokens();

const authService = {
    getCurrentUserRequest,
    postRegisterRequest,
    postLoginRequest,
    logoutUser,
};

export default authService;
