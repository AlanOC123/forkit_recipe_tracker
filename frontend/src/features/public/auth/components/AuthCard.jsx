import { cn } from "../../../../shared/utils";
import styles from "./styles.module.css";
import { Button } from "../../../../shared/components";

const AuthCardBtn = ({ children, ...props }) => {
    return (
        <Button className={cn(styles.authBtn)} {...props}>
            {children}
        </Button>
    );
};

const AuthCardHeader = ({ children }) => {
    return (
        <h2
            className={cn(
                styles.authCardHeader,
                "text-xl font-light text-neutral-800 inline-flex items-center justify-center w-full"
            )}
        >
            {children}
        </h2>
    );
};

const AuthCardInputs = ({ children }) => {
    return (
        <div className={cn(styles.authCardInputs, "grid gap-4")}>
            {children}
        </div>
    );
};

const AuthCardAdditionalInputs = ({ children, className }) => {
    return (
        <div className={cn(styles.authCardAdditionalInputs, className)}>{children}</div>
    );
};

const AuthCardControls = ({ children }) => {
    return (
        <div className={cn(styles.authCardControls, "grid gap-2")}>
            {children}
        </div>
    );
};

export const AuthCard = ({ children }) => {
    return (
        <article className={cn(styles.authCard, "grid gap-12")}>
            {children}
        </article>
    );
};

AuthCard.Header = AuthCardHeader;
AuthCard.Inputs = AuthCardInputs;
AuthCard.AdditionalInputs = AuthCardAdditionalInputs;
AuthCard.Controls = AuthCardControls;
AuthCard.ControlBtn = AuthCardBtn;
