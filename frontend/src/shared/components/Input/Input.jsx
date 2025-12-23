import { forwardRef } from "react";
import { cn } from "../../utils";
import { cva } from "class-variance-authority";

const inputVariants = cva("input text-base text-neutral-700 p-2 rounded-full shadow-sm hover:shadow-md", {
    variants: {
        variant: {
            default: "",
            success: "",
            error: ""
        },
        size: {
            base: ''
        }
    },
    defaultVariants: {
        variant: "default",
        size: 'base'
    },
});

export const Input = forwardRef(
    ({ variant, size, className, onChange, ...props }, ref) => {
        return (
            <input
                className={cn(inputVariants({ variant, size, className }))}
                ref={ref}
                onChange={onChange}
                {...props}
            />
        );
    }
);