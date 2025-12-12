const KEY = 'recentSearches';
const MAX_HISTORY = 5;

export const getHistory = () => JSON.parse(localStorage.getItem(KEY)) || [];

export const setHistory = (history = []) => {
    const updatedHistory = JSON.stringify(history);
    localStorage.setItem(KEY, updatedHistory);
}

export const removeTerm = (ind) => {
    const history = getHistory();
    let index = ind;

    if (Number.isInteger(ind)) {
        index = ind;
    } else {
        index = history.length - 1;
    }
    
    history.splice(index, 1);

    setHistory(history);
    return history;
}

export const addTerm = (term) => {
    let history = getHistory();
    if (history.length >= MAX_HISTORY) {
        history = removeTerm();
    }

    history.unshift(term);

    setHistory(history);
}

export const clearHistory = () => localStorage.removeItem(KEY);