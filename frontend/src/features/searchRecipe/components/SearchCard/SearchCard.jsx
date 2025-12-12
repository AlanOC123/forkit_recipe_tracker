import styles from "./SearchCard.module.css";
import { IconOnlyButton } from "../../../../components/Button/Button";

function SearchCard({ children, onClick, deleteFn, ind, searchTerm }) {
    const handleClick = (e) => {
        e.preventDefault();
        if (onClick) onClick(e);
    };

    return (
        <li className={styles.searchCard} onClick={handleClick} data-search-term={searchTerm}>
            <span className="search-term-text">{children}</span>
            <IconOnlyButton
                icon={"cancel"}
                variant={"destructive"}
                kind={"text"}
                elementClass={styles.removeBtn}
                onClick={deleteFn}
                data-ind={ind}
            />
        </li>
    );
}

function EmptySearchCard() {
    
    return (
        <li className={styles.searchCard}>
            <span className="search-term-text">No Recent Searches</span>
        </li>
    );
}

SearchCard.Empty = EmptySearchCard


export { SearchCard }