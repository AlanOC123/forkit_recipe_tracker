const getItemFromStorage = (key) => {
    if (!key) return null;
    return localStorage.getItem(key);
};

const getItemsFromStorage = (key) => {
    if (!key) return null;
    return JSON.parse(localStorage.getItem(key));
};

const setItemToStorage = (key, item) => {
    if (!(key && item)) {
        console.error(
            key
                ? "Missing item"
                : item
                ? "Missing key"
                : "Missing key and/or item"
        );
        return null;
    }

    localStorage.setItem(key, item);
};

const setItemsToStorage = (key, iter) => {
    if (!(key && iter?.length)) {
        console.error(
            key
                ? "Missing item"
                : iter
                ? "Missing key"
                : "Missing key and/or item"
        );
        return null;
    }

    localStorage.setItem(key, JSON.stringify(iter));
};

const removeItemFromStorage = (key) => {
    if (!key) return null;
    localStorage.removeItem(key);
};

const clearStorage = () => localStorage.clear();

const storageService = {
    getItemFromStorage,
    getItemsFromStorage,
    setItemToStorage,
    setItemsToStorage,
    removeItemFromStorage,
    clearStorage,
};

export default storageService;
