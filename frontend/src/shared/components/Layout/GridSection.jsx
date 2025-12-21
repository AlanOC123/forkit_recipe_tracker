import { cn } from "../../utils";

export function GridSection({ children, className, ...props }) {
    return (
        <section
            className={cn(
                "col-span-4 md:col-span-8 lg:col-span-12",
                "grid grid-cols-subgrid gap-x-4",
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}
