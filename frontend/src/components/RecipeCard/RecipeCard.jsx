import styles from './RecipeCard.module.css'
import placeholderImg from '../../assets/placeholderRecipeImg.jpg'
import { cn } from '../../utils/classNames';
import { Card } from '../Card/Card';
import { Button, IconOnlyButton } from '../Button/Button';

function RecipeCardHeader({ img }) {
    return (
        <div className={styles.recipeCardHeader}>
            <img src={img || placeholderImg} alt="An image of a recipe" />
        </div>
    );
}

function RecipeCardBody({
    title,
    author_username,
    course,
    difficulty,
    cookingTime,
}) {
    return (
        <div className={styles.recipeCardBody}>
            <div className={styles.recipeCardTitle}>
                <h4 className={styles.recipeCardTitleText}>{title}</h4>
                <p className={styles.recipeCardAuthorText}>
                    @{author_username}
                </p>
            </div>
            <div className={styles.recipeCardBadges}>
                <span className={styles.recipeCardBadge}>{course}</span>
                <span className={styles.recipeCardBadge}>{difficulty}</span>
                <div className={styles.cookingTimeContainer}>
                    <span className={styles.cookingTimeText}>
                        {cookingTime}
                    </span>{" "}
                    <span className={styles.cookingTimeText}>Mins</span>
                </div>
            </div>
        </div>
    );
}

function RecipeCardFooter({ id, startRecipeClick, forkRecipeClick }) {
    const handleStart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (startRecipeClick) startRecipeClick(e);
    };

    const handleFork = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (forkRecipeClick) forkRecipeClick(e);
    };

    return (
        <div className={styles.recipeCardFooter}>
            <div className={styles.primaryActions}>
                <IconOnlyButton
                    icon={"cooking"}
                    kind={"primary"}
                    onClick={handleStart}
                />
                <IconOnlyButton
                    kind={"secondary"}
                    icon={"fork_right"}
                    data-id={id}
                    onClick={handleFork}
                />
            </div>
            <IconOnlyButton kind={"text"} icon={"heart_check"} />
        </div>
    );
}

function RecipeCard({
    img,
    title,
    author_username,
    course,
    difficulty,
    id,
    cookingTime,
    onClick,
}) {
    return (
        <Card elementClass={cn(styles.recipeCard)}>
            <RecipeCardHeader img={img} />
            <RecipeCardBody
                title={title}
                course={course}
                difficulty={difficulty}
                author_username={author_username}
                cookingTime={cookingTime}
            />
            <RecipeCardFooter id={id} onClick={onClick} />
        </Card>
    );
}

RecipeCard.Header = RecipeCardHeader
RecipeCard.Body = RecipeCardBody
RecipeCard.Footer = RecipeCardFooter

export { RecipeCard }