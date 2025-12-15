import styles from "./CuisinesLayout.module.css";
import { Section } from "../../../components/Section/Section";
import { useState, useEffect } from "react";
import { useDashboard } from "../../../context/DashboardContext";
import { getCuisines } from "../../../services/cuisinesService";
import { ActionText } from "../components/ActionText/ActionText";
import { BadgeContainer } from "../components/BadgeContainer/BadgeContainer";
import { RecipeCard } from "../../../components/RecipeCard/RecipeCard";
import { useAuth } from "../../../context/AuthContext";
import { getRecipeByCuisine } from "../../../services/recipeService";
import { SearchResults } from "../../../components/SearchResults/SearchResults";

const getActionText = (keyword, user) => {
    if (keyword && user && user?.firstName) {
        return `Feeling ${keyword}, ${user.firstName}?`
    }

    if (keyword && !(user && user?.firstName)) {
        return `Feeling ${keyword}?`;
    }

    if (user && user?.firstName) {
        return `Feeling Something New, ${user.firstName}`;
    }

    return "Feeling Something New?"
}

export function CuisinesLayout() {
    const [cuisines, setCuisines] = useState([]);
    const [currKeyword, setCurrKeyword] = useState("");
    const [resultCount, setResultCount] = useState(0);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [actionText, setActionText] = useState("");
    const [isCusineContainerOpen, setIsCusineContainerOpen] = useState(false);
    const { updateHeaderValue } = useDashboard();
    const { user } = useAuth();

    useEffect(() => {
        const initCuisines = async () => {
            setActionText(() => getActionText(user));
            setIsLoading(true);
            const results = await getCuisines();
            setCuisines(results);
            setIsLoading(false);
        };

        updateHeaderValue("Cuisines");
        initCuisines();
    }, []);

    useEffect(() => {
        const searchRecipes = async () => {
            setIsLoading(true)
            if (!currKeyword) return;

            const searchResults = await getRecipeByCuisine(currKeyword);
            setResults(searchResults);
            setResultCount(searchResults.length)
            setIsLoading(false)
            setIsCusineContainerOpen(false)
        };

        searchRecipes();
    }, [currKeyword]);

    const handleBadgeClick = (e) => {
        const { dataset } = e.currentTarget;
        const { keyword } = dataset;
        const text = getActionText(keyword, user);
        setActionText(text);
        setCurrKeyword(keyword);
    };

    const cards = resultCount
        ? results.map(
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
        : <SearchResults.EmptyCard />;

    return (
        <Section className={styles.cuisinesContainer}>
            <ActionText>{actionText}</ActionText>
            <BadgeContainer
                isShown={isCusineContainerOpen}
                toggleContainerStateFn={() => setIsCusineContainerOpen(!isCusineContainerOpen)}
            >
                {cuisines.map(({ id, name, icon }) => (
                    <BadgeContainer.CuisineBadge
                        key={id}
                        id={id}
                        name={name}
                        icon={icon}
                        onClick={handleBadgeClick}
                    />
                ))}
            </BadgeContainer>
            {isLoading ? (
                <SearchResults.LoadingCard />
            ) : (
                <SearchResults
                    resultCount={resultCount}
                    isLoading={isLoading}
                    isPopulated={resultCount > 0}
                >
                    {cards}
                </SearchResults>
            )}
        </Section>
    );
}
