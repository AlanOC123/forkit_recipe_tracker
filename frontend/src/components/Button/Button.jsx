import { useState } from "react";
import { StandardIcon, ToggleIcon } from "../Icon/Icon";
import styles from "./Button.module.css";

export function Button({
    children,
    kind,
    variant = "standard",
    icon,
    size = "sm",
    href=null,
    type="button",
    classNames=[],
    ...props
}) {
    const className = [
        styles.btn,
        styles[kind],
        styles[variant],
        size !== undefined || size !== null ? styles[size] : false,
        styles.standard,
        ...classNames
    ]
        .filter(Boolean)
        .join(" ");

    const el = href ? (
        <a href={href} className={className} {...props}>
            {icon && <StandardIcon>{icon}</StandardIcon>}
            {children && <span>{children}</span>}
        </a>
    ) : (
        <button type={type} className={className} {...props}>
            {icon && <StandardIcon>{icon}</StandardIcon>}
            {children && <span>{children}</span>}
        </button>
    );

    return el;
}

export function ToggleButton({
    children,
    type,
    icon,
    size = "sm",
    initialToggleState = false,
    onClick,
    classNames=[],
    ...props
}) {
    const [isActive, setIsActive] = useState(initialToggleState);

    const className = [
        styles.btn,
        styles[type],
        styles.toggle,
        size !== undefined || size !== null ? styles[size] : false,
        isActive ? styles.active : styles.inactive,
        styles.toggle,
        ...classNames
    ]
        .filter(Boolean)
        .join(" ");

    const handleClick = (e) => {
        setIsActive(!isActive);
        if (onClick) onClick(e);
    };

    return (
        <button className={className} onClick={handleClick} {...props}>
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
    classNames=[],
    ...props
}) {
    const className = [
        styles["icon-only"],
        styles[kind],
        styles[variant],
        styles[size],
        ...classNames
    ].join(' ');
    return (
        <button className={className} {...props}>
            <StandardIcon>{icon}</StandardIcon>
        </button>
    );
}