import tokensService from "../services/tokens";

const initFetch = (refresh) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
});

export const refreshAccessToken = async () => {
    const { getTokens } = tokensService;
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`;
    const { REFRESH } = getTokens();

    const res = await fetch(url, initFetch(REFRESH));
    const data = await res.json();

    if (!res.ok) {
        const { detail, code } = data;
        throw new Error(`Detail: ${detail}. Code: ${code}`);
    }

    const { access } = data;

    return access;
};
