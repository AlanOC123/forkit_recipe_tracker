import { useState } from "react";
import { StandardIcon, ToggleIcon } from "../Icon/Icon";
import styles from "./Button.module.css";
import { cn } from "../../utils/classNames";

export function Button({
    children,
    kind,
    variant = "standard",
    icon,
    size = "sm",
    href=null,
    type="button",
    elementClass,
    ...props
}) {
    const elementStyle = cn(
        styles.btn,
        styles[kind],
        styles[variant],
        size !== undefined || size !== null ? styles[size] : false,
        elementClass
    );

    const el = href ? (
        <a href={href} className={elementStyle} {...props}>
            {icon && <StandardIcon>{icon}</StandardIcon>}
            {children && <span>{children}</span>}
        </a>
    ) : (
        <button type={type} className={elementStyle} {...props}>
            {icon && <StandardIcon>{icon}</StandardIcon>}
            {children && <span>{children}</span>}
        </button>
    );

    return el;
}

export function ToggleButton({
    children,
    kind,
    type,
    icon,
    size = "sm",
    initialToggleState = false,
    onClick,
    elementClass,
    ...props
}) {
    const [isActive, setIsActive] = useState(initialToggleState);

    const elementStyle = cn(
        styles.btn,
        styles[kind],
        styles.toggle,
        size !== undefined || size !== null ? styles[size] : false,
        isActive ? styles.active : styles.inactive,
        elementClass
    );

    const handleClick = (e) => {
        setIsActive(!isActive);
        if (onClick) onClick(e);
    };

    return (
        <button type={type} className={elementStyle} onClick={handleClick} {...props}>
            {icon && <ToggleIcon isToggled={isActive}>{icon}</ToggleIcon>}
            {children && <span>{children}</span>}
        </button>
    );
}

export function IconOnlyButton({
    icon,
    variant = "standard",
    size = "sm",
    kind,
    elementClass,
    ...props
}) {
    const elementStyle = cn(
        styles["icon-only"],
        styles[kind],
        styles[variant],
        styles[size],
        elementClass
    );

    return (
        <button className={elementStyle} {...props}>
            <StandardIcon>{icon}</StandardIcon>
        </button>
    );
}

export function IconOnlyToggleButton({
    icon,
    size = "sm",
    kind,
    initialToggleState = false,
    onClick,
    elementClass,
    ...props
}) {
    const [isActive, setIsActive] = useState(initialToggleState);

    const handleClick = (e) => {
        setIsActive(!isActive);
        if (onClick) onClick(e);
    };

    const elementStyle = cn(
        styles["icon-only"],
        styles[kind],
        styles.toggle,
        isActive ? styles.active : styles.inactive,
        styles[size],
        elementClass
    );

    return (
        <button onClick={handleClick} className={elementStyle} {...props}>
            <ToggleIcon>{icon}</ToggleIcon>
        </button>
    );
}