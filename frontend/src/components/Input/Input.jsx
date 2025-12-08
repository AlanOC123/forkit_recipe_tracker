import styles from "./Input.module.css";
import { IconOnlyButton, IconOnlyToggleButton } from "../Button/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../utils/classNames";

export function TextInputGroup({
    placeholder,
    inputValue = "",
    onChange,
    labelText,
    error = null,
    ...props
}) {
    return (
        <div className={styles["text-field"]} {...props}>
            {labelText && (
                <label className={styles["input-label"]}>{labelText}</label>
            )}
            <input
                className={styles["text-input"]}
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={onChange}
            />
            {error && <span className={cn(styles.inputMsg, styles.errorMsg)}>{error}</span>}
        </div>
    );
}

export function PasswordInputGroup({
    placeholder,
    inputValue = "",
    onChange,
    labelText,
    error,
    ...props
}) {
    const [isShown, setIsShown] = useState(false);
    const inputRef = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        setIsShown(() => !isShown);
        inputRef.current.focus();
    };

    return (
        <div className={styles["text-field"]} {...props}>
            {labelText && (
                <label className={styles["input-label"]}>{labelText}</label>
            )}
            <div className={styles["password-input"]}>
                <input
                    className={styles["text-input"]}
                    type={isShown ? "text" : "password"}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={onChange}
                    ref={inputRef}
                />
                <IconOnlyToggleButton
                    kind={"text"}
                    icon={isShown ? "visibility" : "visibility_off"}
                    onClick={handleClick}
                    elementClass={cn(styles["show-password"])}
                />
            </div>
            {error && (
                <span className={cn(styles.inputMsg, styles.errorMsg)}>
                    {error}
                </span>
            )}
        </div>
    );
}

export function EmailInputGroup({
    placeholder,
    inputValue = "",
    labelText,
    onChange,
    error: externalError,
    ...props
}) {
    
    const validationError = useMemo(() => {
        if (!inputValue || inputValue.length < 5) return null;
        if (!inputValue.includes("@")) return "Invalid email. Must include an @ symbol."
        return null
    }, [inputValue])

    const displayError = externalError || validationError;

    return (
        <div className={styles["text-field"]} {...props}>
            {labelText && (
                <label className={styles["input-label"]}>{labelText}</label>
            )}
            <input
                type="email"
                placeholder={placeholder}
                value={inputValue}
                onChange={onChange}
                className={styles["text-input"]}
            />
            {displayError && (
                <span className={cn(styles.inputMsg, (externalError ? styles.errorMsg : styles.warningMsg))}>
                    {displayError}
                </span>
            )}
        </div>
    );
}
