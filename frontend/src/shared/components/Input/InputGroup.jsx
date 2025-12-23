import { cn } from "../../utils";

export const InputGroup = ({ children, className, ...props }) => {
    return (
        <div className={cn("grid", className)} {...props}>
            {children}
        </div>
    );
}