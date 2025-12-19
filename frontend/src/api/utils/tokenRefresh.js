import { tokenAPI } from "../services";

const initFetch = (refresh) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
});

const tokenRefresh = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`;
    const { refresh } = tokenAPI.getTokens();

    const res = await fetch(url, initFetch(refresh));
    const data = await res.json();

    if (!res.ok) {
        const { detail, code } = data;
        throw new Error(`Detail: ${detail}. Code: ${code}`);
    }

    const { access } = data;

    return access;
};

export default tokenRefresh;
