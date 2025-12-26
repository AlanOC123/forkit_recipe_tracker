import { getBaseURL } from "../../api/constants";

const BASE_URL = getBaseURL();

const getImage = (path) => {
    if (!path) return;

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path
    }

    const baseUrl = BASE_URL?.replace(/\$/, "");
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${cleanPath}`
}

export default getImage;