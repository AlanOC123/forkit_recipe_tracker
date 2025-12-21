import { cn } from "../../utils";

export function GridItem({ children, colSpan = "full", className, ...props }) {
    const spanClasses = {
        full: "col-span-4 md:col-span-8 lg:col-span-12",
        half: "col-span-4 md:col-span-4 lg:col-span-6",
        third: "col-span-4 md:col-span-4 lg:col-span-4",
        quarter: "col-span-2 md:col-span-2 lg:col-span-3",
    };

    return (
        <div
            className={cn(spanClasses[colSpan] || colSpan, className)}
            {...props}
        >
            {children}
        </div>
    );
}
