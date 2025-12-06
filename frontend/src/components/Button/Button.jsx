import { useState } from 'react';
import styles from './Button.module.css';

export function DefaultButton({ 
    children, 
    variant="filled", 
    className, 
    icon, 
    ...props 
}) {
    const hasText = children !== undefined && children !== null;

    const classNames = [
        styles.btn,
        styles[variant],
        !hasText ? styles.iconOnly : false,
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={ classNames } { ...props }>
            {icon && <span className={styles.iconWrapper}>{icon}</span>}
            {hasText && <span className={styles.label}>{children}</span>}
        </button>
    )
}

export function ToggleButton({ children, variant, className, icon, onClick, initialState=false, ...props }) {
    const [isActive, setIsActive] = useState(initialState);
    const hasText = children !== undefined && children !== null;

    const handleClick = (e) => {
        setIsActive(!isActive);
        if (onClick) onClick(e);
    };

    const classNames = [
        styles.btn,
        styles[variant],
        !hasText ? styles.iconOnly : false,
        isActive ? styles.active : false,
        className,
    ].filter(Boolean).join(" ");

    return (
        <button aria-pressed={isActive} className={classNames} onClick={handleClick} {...props}>
            {icon && <span className={styles.iconWrapper}>{icon}</span>}
            {hasText && <span className={styles.label}>{children}</span>}
        </button>
    );
}