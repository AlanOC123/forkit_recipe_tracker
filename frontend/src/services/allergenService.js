import api from '../api';

const ENDPOINT = '/allergens';

export const getAllergens = async () => {
    const { data } = await api.get(ENDPOINT);
    return data;
}