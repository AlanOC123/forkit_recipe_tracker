import { useState, useEffect } from "react";

export function useDebounce(value, delay = 500) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeoutID = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(timeoutID)
    }, [value, delay])

    return debounceValue;
}