import styles from "./ForgotPassword.module.css";
import { Button } from "../../../../components/Button/Button";
import { cn } from "../../../../utils/classNames";

export function ForgotPassword({ elementClass }) {
    const elementStyles = cn(styles.forgotPassword, elementClass);

    return (
        <p className={elementStyles}>
            <span>Forgot Password?</span>
            <span>
                <Button
                    kind={"text"}
                    href={"/forgot-password"}
                    size="xs"
                    classNames={[styles.passwordReset]}
                >
                    Request Reset
                </Button>
            </span>
        </p>
    );
}
