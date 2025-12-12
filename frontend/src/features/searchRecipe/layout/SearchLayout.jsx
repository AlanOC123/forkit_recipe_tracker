import {
    getHistory,
    setHistory,
    addTerm,
    removeTerm,
    clearHistory,
} from "../services/searchHistory";
import styles from "./SearchLayout.module.css";
import { Section } from "../../../components/Section/Section";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SearchCard } from "../components/SearchCard/SearchCard";
import { History } from "../components/History/History";
import { useDashboard } from "../../../context/DashboardContext";
import { useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useState } from "react";
import { SearchResults } from "../components/SearchResults/SearchResults";

const DUMMY_DATA = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        author_username: "chef_mario",
        course: "Dinner",
        difficulty: "Medium",
        fork_count: 42,
    },
    {
        id: 2,
        title: "Avocado Toast",
        author_username: "hip_cook",
        course: "Breakfast",
        difficulty: "Easy",
        fork_count: 10,
    },
    {
        id: 3,
        title: "Beef Wellington",
        author_username: "gordon_r",
        course: "Lunch",
        difficulty: "Hard",
        fork_count: 156,
    },
];

const mockSearchService = async (term) => {
    return new Promise((resolve) => {
        console.log(`Searching for: ${term}...`);

        // Simulate 1.5 second network delay
        setTimeout(() => {
            resolve(DUMMY_DATA);
        }, 1500);
    });
};

export function SearchLayout() {
    const { updateHeaderValue } = useDashboard();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [receipeCount, setRecipeCount] = useState(0);
    const [recent, setRecent] = useState([]);
    const [recentCount, setRecentCount] = useState(0);

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        const initRecent = () => {
            const history = getHistory();
            setRecent(history);
            setRecentCount(history.length);
        };

        updateHeaderValue("Search");
        initRecent();
    }, []);

    useEffect(() => {
        const setDefaultRecipeState = () => {
            setRecipes([]);
            setRecipeCount(0);
        };

        if (!debouncedSearchTerm) {
            setDefaultRecipeState();
            return;
        }

        const executeSearch = async () => {
            setIsLoading(true);

            const results = await mockSearchService(debouncedSearchTerm);

            setRecipes(results);
            setRecipeCount(results.length);

            if (!recent.includes(debouncedSearchTerm)) {
                addTerm(debouncedSearchTerm);
                const updatedHistory = getHistory();
                setRecent(updatedHistory);
                setRecentCount(updatedHistory.length);
            }

            setIsLoading(false);
        };

        executeSearch();
    }, [debouncedSearchTerm]);

    const quickSearch = (e) => {
        e.stopPropagation();
        const { currentTarget } = e;
        const { dataset } = currentTarget;
        const { searchTerm } = dataset;
        setSearchTerm(searchTerm);
    };

    const deleteRecentSearch = (e) => {
        e.stopPropagation();
        const { currentTarget } = e;
        const { dataset } = currentTarget;
        const ind = Number(dataset.ind);
        removeTerm(ind);
        const history = getHistory();
        setRecent(history);
        setRecentCount(history.length);
    };

    let cards = null;

    if (isLoading) {
        cards = <SearchResults.LoadingCard />;
    } else if (!receipeCount) {
        cards = <SearchResults.EmptyCard />;
    } else {
        cards = recipes.map(({title, course, difficulty, id}) => <SearchResults.ResultCard title={title} course={course} difficulty={difficulty} id={id} />);
    }

    return (
        <Section>
            <div className={styles.searchContainer}>
                <SearchBar
                    inputValue={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <History searchCount={recentCount}>
                    {recent.length ? (
                        recent.map((term, ind) => (
                            <SearchCard
                                onClick={quickSearch}
                                deleteFn={deleteRecentSearch}
                                ind={ind}
                                key={term}
                                searchTerm={term}
                            >
                                {term}
                            </SearchCard>
                        ))
                    ) : (
                        <SearchCard.Empty />
                    )}
                </History>
                <SearchResults resultCount={receipeCount}>{cards}</SearchResults>
            </div>
        </Section>
    );
}
