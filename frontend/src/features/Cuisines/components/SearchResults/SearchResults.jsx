import styles from "./SearchResults.module.css";

export function SearchResults({ children }) {
    return (
        <div className={styles.searchResults}>
            <ul className={styles.resultsList}>{children}</ul>
        </div>
    );
}
