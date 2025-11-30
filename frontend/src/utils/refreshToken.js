import { getTokens } from "../services/tokenService";

const getFetchInit = (refresh) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
});

export const refreshAccessToken = async () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`;
    const { refresh } = getTokens()

    const res = await fetch(url, getFetchInit(refresh))
    const data = await res.json()

    if (!res.ok) {
        const { detail, code } = data;
        throw new Error(`Detail: ${detail}. Code: ${code}`)
    }

    const { access } = data;

    return access
}