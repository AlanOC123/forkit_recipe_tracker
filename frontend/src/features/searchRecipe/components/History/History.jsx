import styles from "./History.module.css";
import { IconOnlyButton } from "../../../../components/Button/Button";
import { cn } from "../../../../utils/classNames";
import { useState } from "react";

export function History({ children, initialState = false, searchCount = 0 }) {
    const [isShown, setIsShown] = useState(initialState);
    const btnStyle = isShown ? styles.collapseHistory : styles.expandHistory;
    const containerStyle = isShown ? styles.expandedContainer : styles.collapsedContainer;

    const updateIsShown = () => setIsShown(!isShown);

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
                    onClick={updateIsShown}
                    kind={"text"}
                />
            </div>
            <div className={cn(styles.historyWrapper, containerStyle)}>
                <ul className={styles.historyList}>{children}</ul>
            </div>
        </div>
    );
}
