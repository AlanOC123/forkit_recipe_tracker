import styles from "./Button.module.css";
import { cn } from "../../../utils";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva("btn", {
    variants: {
        variant: {
            primary:
                "bg-neutral-950 text-neutral-50 rounded-full shadow-md hover:bg-neutral-800 hover:shadow-lg primary",
            secondary:
                "bg-white rounded-full shadow-sm hover:bg-neutral-100 hover:shadow-md secondary",
            outlined:
                "rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 outlined",
            ghost: "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-full",
            link: "link text-neutral-800 hover:text-accent-400 link",
            destructive:
                "bg-destructive-50 text-destructive-950 rounded-full shadow-sm hover:shadow-md hover:bg-destructive-200 destructive ",
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 px-3",
            lg: "h-11 px-8",
            icon: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

const Button = forwardRef(({ children, className, variant, size, ...props }, ref) => {
    const { onClick } = props;

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
        ref={ref}
            onClick={handleClick}
            className={cn(
                buttonVariants({ variant, size, className }),
                styles.btn
            )}
        >
            {children}
        </button>
    );
})

export default Button;
