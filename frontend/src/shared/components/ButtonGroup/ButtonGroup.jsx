import { cva } from "class-variance-authority";
import { cn } from "../../../utils";
import { forwardRef, Children, isValidElement, cloneElement } from "react";

const buttonGroupVariants = cva(
    "inline-flex rounded-lg shadow-sm", 
    {
        variants: {
            orientation: {
                horizontal: "flex-row",
                vertical: "flex-col",
            },
        },
        defaultVariants: {
            orientation: "horizontal"
        }
    }
);

const ButtonGroup = forwardRef(({ className, orientation, children, props  }, ref) => {
    return (
        <div
            ref={ref}
            role="group"
            className={cn(buttonGroupVariants({ orientation }), className)}
            {...props}
        >
            {Children.map(children, (child, ind) => {
                if (!isValidElement(child)) return null;

                return cloneElement(child, {
                    className: cn(
                        child.props.className,
                        "rounded-none shadow-none focus-visible:z-10",

                        orientation === "horizontal" && "first:rounded-l-lg last:rounded-r-lg border-r-0 last-border-r",
                        orientation === "horizontal" && ind !== 0 && "-ml-px",

                        orientation === "vertical" && "first:rounded-t-lg last:rounded-b-lg border-b-0 last:border-b w-full",
                        orientation === "vertial" && ind !== 0 && "-mt-px"
                    )
                })
            })}
        </div>
    )
})

ButtonGroup.displayName = "ButtonGroup";
export default ButtonGroup;