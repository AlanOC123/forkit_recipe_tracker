import { cva } from "class-variance-authority";
import { cn } from "../../utils";

const alertVariants = cva("alert", {
    variants: {
        variant: {
            error: "",
            warning: "",
            info: "",
        },
        size: {
            base: "",
            md: "",
            lg: "",
        },
    },
    defaultVariants: {
        variant: "info",
        size: "base",
    },
});

export const Alert = ({ children, className, variant, size, ...props }) => {
    return (
        <div className={cn(alertVariants({ variant, size, className }))} {...props}>
            {children}
        </div>
    );
};
