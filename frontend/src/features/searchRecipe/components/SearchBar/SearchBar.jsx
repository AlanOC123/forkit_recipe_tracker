import { SearchInput } from "../../../../components/Input/Input";
import { cn } from "../../../../utils/classNames";
import styles from "./SearchBar.module.css";
import { StandardIcon } from "../../../../components/Icon/Icon";

export function SearchBar({ inputValue, onChange, onFocus, ...props }) {
    return (
        <div className={styles.searchBarContainer}>
            <SearchInput
                elementClass={cn(styles.searchBar)}
                inputValue={inputValue}
                onChange={onChange}
                placeholder={"Find recipes..."}
                onFocus={onFocus}
                {...props}
            />
            <StandardIcon elementClass={styles.searchIcon}>search</StandardIcon>
        </div>
    );
}
