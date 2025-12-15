import api from '../api';

const ENDPOINTS = {
    CUISINES: "api/cuisines/",
};

export const getCuisines = async () => {
    const { data } = await api.get(ENDPOINTS.CUISINES)
    return data
} 