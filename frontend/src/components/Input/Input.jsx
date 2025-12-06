import styles from "./Input.module.css";
import { IconOnlyButton } from "../Button/Button";
import { useRef, useState } from "react";

export function TextInputGroup({
    placeholder,
    inputValue = '',
    onChange,
    labelText,
    ...props
}) {
    return (
        <div className={styles['text-field']} {...props}>
            {labelText && (
                <label className={styles["input-label"]}>
                    {labelText}
                </label>
            )}
            <input
                className={styles["text-input"]}
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={onChange}
            />
        </div>
    );
}

export function PasswordInputGroup({
    placeholder,
    inputValue = "",
    onChange,
    labelText,
    ...props
}) {
    const [isShown, setIsShown] = useState(false);
    const inputRef = useRef(null);

    const handleClick = () => {
        setIsShown(() => !isShown);
        inputRef.current.focus();
    };

    return (
        <div className={styles["password-field"]} {...props}>
            {labelText && (
                <label className={styles["input-label"]}>
                    {labelText}
                </label>
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
                <IconOnlyButton
                    kind={"text"}
                    icon={isShown ? "visibility_off" : "visibility"}
                    onClick={handleClick}
                    classNames={[styles["show-password"]]}
                />
            </div>
        </div>
    );
}