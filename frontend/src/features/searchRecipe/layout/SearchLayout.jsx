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
import { useEffect, useRef } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useState } from "react";
import { SearchResults } from "../../../components/SearchResults/SearchResults";
import { searchRecipe } from "../../../services/recipeService";
import { RecipeCard } from "../../../components/RecipeCard/RecipeCard";

export function SearchLayout() {
    const { updateHeaderValue } = useDashboard();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [recipeCount, setRecipeCount] = useState(0);
    const [recent, setRecent] = useState([]);
    const [recentCount, setRecentCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false)

    const blurTimerRef = useRef(null);
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

            const results = await searchRecipe(debouncedSearchTerm);

            console.log(results);

            setRecipes(results);
            setRecipeCount(results.length);

            if (!recent.includes(debouncedSearchTerm)) {
                addTerm(debouncedSearchTerm);
                const updatedHistory = getHistory();
                setRecent(updatedHistory);
                setRecentCount(updatedHistory.length);
            }

            setIsOpen(false);
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

    const cards = recipeCount
        ? recipes.map(
              ({
                  title,
                  author_username,
                  course,
                  cuisine,
                  difficulty,
                  id,
                  cook_time,
              }) => (
                  <RecipeCard
                      title={title}
                      course={course}
                      cuisine={cuisine}
                      key={id}
                      difficulty={difficulty}
                      cookingTime={cook_time}
                      author_username={author_username}
                  />
              )
          )
        : null;

    
    const handleFocus = () => {
        if (blurTimerRef.current) {
            clearTimeout(blurTimerRef.current);
        }

        setIsOpen(true)
    } 

    const handleBlur = () => {
        blurTimerRef.current = setTimeout(() => { setIsOpen(false) }, 200)
    }

    return (
        <Section>
            <div className={styles.searchContainer}>
                <SearchBar
                    inputValue={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <History searchCount={recentCount} onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
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
                {isLoading ? (
                    <SearchResults.LoadingCard />
                ) : (
                    <SearchResults
                        resultCount={recipeCount}
                        isLoading={isLoading}
                        isPopulated={recipeCount > 0}
                    >
                        {cards}
                    </SearchResults>
                )}
            </div>
        </Section>
    );
}
