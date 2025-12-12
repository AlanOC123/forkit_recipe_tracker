import { SearchInput } from "../../../../components/Input/Input";
import { cn } from "../../../../utils/classNames";
import styles from "./SearchBar.module.css";
import { StandardIcon } from "../../../../components/Icon/Icon";

export function SearchBar({ inputValue, onChange, ...props }) {
    return (
        <div className={styles.searchBarContainer}>
            <SearchInput
                elementClass={cn(styles.searchBar)}
                inputValue={inputValue}
                onChange={onChange}
                {...props}
                placeholder={"Find recipes..."}
            />
            <StandardIcon elementClass={styles.searchIcon}>search</StandardIcon>
        </div>
    );
}
