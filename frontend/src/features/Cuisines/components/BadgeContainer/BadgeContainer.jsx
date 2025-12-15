import { useState } from "react";
import {
    IconOnlyButton,
    IconOnlyToggleButton,
} from "../../../../components/Button/Button";
import styles from "./BadgeContainer.module.css";
import { cn } from "../../../../utils/classNames";

function CuisineBadge({ id, name, icon, onClick, onMouseEnter, onMouseLeave }) {
    const handleClick = (e) => {
        e.preventDefault();
        if (onClick) onClick(e);
    };

    return (
        <button
            data-keyword={name}
            data-id={id}
            className={styles.cuisineBadge}
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span className={styles.cuisineIcon}>{icon}</span>
            <span className={styles.cuisineName}>{name}</span>
        </button>
    );
}

function BadgeContainer({ children, isShown, toggleContainerStateFn }) {
    console.log(isShown);

    return (
        <div className={styles.badgeContainer}>
            <div className={styles.badgeControls}>
                <span className={styles.badgeControlHeader}>Show Types</span>
                <IconOnlyToggleButton
                    isToggled={isShown}
                    onClick={toggleContainerStateFn}
                    icon={"arrow_drop_down"}
                    kind={"tertiary"}
                    elementClass={(isShown ? styles.containerShown : styles.containerHidden)}
                />
            </div>
            <div
                className={cn(
                    styles.badgeListContainer,
                    isShown ? styles.shown : styles.hidden
                )}
            >
                <ul className={styles.badgeList}>{children}</ul>
            </div>
        </div>
    );
}

BadgeContainer.CuisineBadge = CuisineBadge;

export { BadgeContainer };
