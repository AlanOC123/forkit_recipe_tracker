import { cn } from '../../utils/classNames';
import styles from './Icon.module.css';

export function StandardIcon({ children, elementClass, size }) {
    const elementStyle = cn(
        styles.icon,
        styles.standard,
        size !== undefined || size !== null ? styles[size] : false,
        elementClass
    );

    return (
        <span className={elementStyle}>
            <i
                className="material-symbols-outlined"
                style={{ verticalAlign: "middle", fontStyle: "normal" }}
            >
                {children}
            </i>
        </span>
    ); 
}

export function ToggleIcon({ children, size, elementClass, isToggled }) {
    const elementStyle = cn(
        styles.icon,
        styles.toggle,
        isToggled ? styles.toggled : styles.untoggled,
        size !== undefined || size !== null ? styles[size] : false,
        elementClass
    );

    return (
        <span className={elementStyle}>
            <i
                className="material-symbols-outlined"
                style={{ verticalAlign: "middle", fontStyle: "normal" }}
            >
                {children}
            </i>
        </span>
    );
}