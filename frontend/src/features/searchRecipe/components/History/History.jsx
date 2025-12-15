import styles from "./History.module.css";
import { IconOnlyButton } from "../../../../components/Button/Button";
import { cn } from "../../../../utils/classNames";

export function History({ children, isOpen = false, onToggle, searchCount = 0 }) {
    const btnStyle = isOpen ? styles.collapseHistory : styles.expandHistory;
    const containerStyle = isOpen ? styles.expandedContainer : styles.collapsedContainer;

    return (
        <div className={styles.history}>
            <div className={styles.historyControls}>
                <div className={styles.showRecentContainer}>
                    <h4 className={styles.historyHeader}>Recent Searches</h4>
                    <p className={styles.searchCount}>{searchCount}</p>
                </div>
                <IconOnlyButton
                    icon={"arrow_drop_down"}
                    elementClass={cn(btnStyle)}
                    onClick={onToggle}
                    kind={"text"}
                />
                <div className={cn(styles.historyWrapper, containerStyle)}>
                    <ul className={styles.historyList}>{children}</ul>
                </div>
            </div>
        </div>
    );
}
