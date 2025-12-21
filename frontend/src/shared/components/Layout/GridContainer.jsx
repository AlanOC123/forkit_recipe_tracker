import { cn } from "../../utils";

export function GridContainer({ children, className, ...props }) {
    return (
        <div
            className={cn(
                "grid w-full max-w-[1800px] mx-auto px-4 md:px-8 gap-x-4 gap-y-8",
                "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}