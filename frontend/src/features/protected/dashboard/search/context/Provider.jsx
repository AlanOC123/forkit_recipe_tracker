import Context from "./Context";
import { storageService } from "../../../../../api";
import { useSearchRecipes, useDebounce } from "../hooks";
import { getRecentSearchKey } from "../constants";
import { useState } from "react";

const STORAGE_KEY = getRecentSearchKey();

const Provider = ({ children }) => {
    const { getItemsFromStorage, setItemsToStorage } = storageService;

    const [searchTerm, setSearchTerm] = useState(null);
    const debouncedTerm = useDebounce(searchTerm);

    const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false)
    const { data: searchResults, isLoading } = useSearchRecipes(debouncedTerm);

    const recentSearches = getItemsFromStorage(STORAGE_KEY);

    const updateSearchTerm = (e) => {
        e.preventDefault();
        setSearchTerm(e.currentTarget.value);
        const newSearchHistory = [debouncedTerm, ...recentSearches];
        setItemsToStorage(STORAGE_KEY, newSearchHistory);
    };

    const openWindow = () => setIsSearchWindowOpen(true);
    const closeWindow = () => setIsSearchWindowOpen(false);

    return (
        <Context.Provider
            value={{
                searchTerm,
                recentSearches,
                searchResults,
                isLoading,
                isSearchWindowOpen,
                updateSearchTerm,
                openWindow,
                closeWindow
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
