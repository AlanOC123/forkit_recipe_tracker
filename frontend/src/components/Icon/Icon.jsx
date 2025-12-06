import styles from './Icon.module.css';

export function StandardIcon({ children, size }) {
    const classNames = [
        styles.icon,
        styles.standard,
        "material-symbols-outlined",
        size !== undefined || size !== null ? styles[size] : false
    ].filter(Boolean).join(' ')

    return (
        <span className={classNames}>
            <i
                className="material-symbols-outlined"
                style={{ verticalAlign: "middle", fontStyle: "normal" }}
            >
                {children}
            </i>
        </span>
    ); 
}

export function ToggleIcon({ children, size, isToggled }) {
    const classNames = [
        styles.icon,
        styles.toggle,
        isToggled ? styles.toggled : styles.untoggled,
        size !== undefined || size !== null ? styles[size] : false,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classNames}>
            <i
                className="material-symbols-outlined"
                style={{ verticalAlign: "middle", fontStyle: "normal" }}
            >
                {children}
            </i>
        </span>
    );
}