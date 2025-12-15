import { cn } from "../../utils/classNames";
import styles from "./SearchResults.module.css";
import { Card } from "../Card/Card";
import { SyncLoader } from "react-spinners";
import { StandardIcon } from "../Icon/Icon";

function EmptyCard() {
    return (
        <Card elementClass={styles.emptyCard}>
            <StandardIcon size={"lg"}>info</StandardIcon>
            <h4 className={styles.emptyCardText}>No Results...</h4>
        </Card>
    );
}

function LoadingCard() {
    return (
        <Card elementClass={styles.loadingCard}>
            <p className={styles.loadingText}>Searching</p>
            <SyncLoader size={24} />
        </Card>
    );
}

function SearchResults({ children, isLoading, isPopulated }) {
    let elementStyle = null;

    if (isLoading) {
        elementStyle = styles.loading;
    } else if (isPopulated) {
        elementStyle = styles.populated;
    } else {
        styles.empty
    }

    return (
        <div className={styles.searchResultsContainer}>
            <ul className={cn(styles.cardsList, elementStyle)}>{children}</ul>
        </div>
    );
}

SearchResults.EmptyCard = EmptyCard;
SearchResults.LoadingCard = LoadingCard;

export { SearchResults };
