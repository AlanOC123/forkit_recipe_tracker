import { cn } from "../../../../utils/classNames";
import styles from "./SearchResults.module.css";
import { Card } from "../../../../components/Card/Card";
import placeholderImg from "../../../../assets/placeholderRecipeImg.jpg";
import { Button } from "../../../../components/Button/Button";
import { SyncLoader } from 'react-spinners'
import { StandardIcon } from "../../../../components/Icon/Icon";

function RecipeCardHeader({ img }) {
    return (
        <div className={styles.recipeCardHeader}>
            <img src={img || placeholderImg} alt="An image of a recipe" />
        </div>
    );
}

function RecipeCardBody({ title, course, difficulty }) {
    return (
        <div className={styles.recipeCardBody}>
            <div className={styles.recipeCardBadges}>
                <span className={styles.recipeCardBadge}>{course}</span>
                <span className={styles.recipeCardBadge}>{difficulty}</span>
            </div>
            <div className={styles.recipeCardHeader}>
                <h4 className={styles.recipeCardHeaderText}>{title}</h4>
            </div>
        </div>
    );
}

function RecipeCardFooter({ id, onClick }) {
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onClick) onClick(e) 
    }

    return (
        <Button icon={"start"} data-recipe-id={id} onClick={handleClick}>Cook</Button>
    )
}

function RecipeCard({ img, title, course, difficulty, id, onClick }) {
    return <Card elementClass={cn(styles.recipeCard)}>
        <RecipeCardHeader img={img}/>
        <RecipeCardBody title={title} course={course} difficulty={difficulty} />
        <RecipeCardFooter id={id} onClick={onClick} />
    </Card>;
}

function EmptyCard() {
    return <Card elementClass={styles.emptyCard}>
        <StandardIcon size={"lg"}>info</StandardIcon>
        <h4 className={styles.emptyCardText}>No Results...</h4>
    </Card>
}

function LoadingCard() {
    return <Card elementClass={styles.loadingCard}>
        <SyncLoader size={24}/>
    </Card>
}

function SearchResults({ children, resultCount = 0 }) {
    return (
        <div className={styles.searchResultsContainer}>
            <div className={styles.resultsHeader}>
                <span className={styles.resultsHeaderText}>
                    Number of Results:
                </span>
                <span className={styles.resultsHeaderText}>{resultCount}</span>
            </div>
            <ul
                className={cn(
                    styles.cardsList,
                    resultCount > 0 ? styles.populated : styles.empty
                )}
            >
                {children}
            </ul>
        </div>
    );
}

SearchResults.EmptyCard = EmptyCard
SearchResults.LoadingCard = LoadingCard
SearchResults.ResultCard = RecipeCard

export { SearchResults };
