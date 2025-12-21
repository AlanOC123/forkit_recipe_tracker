import { cn } from "../../utils";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CarouselControlButton = ({
    onClick,
    className,
    direction,
    icon,
    ...props
}) => {
    const directionClass = {
        right: "right-0",
        left: "left-0",
    };

    return (
        <div
            className={cn(
                "absolute top-0 bottom-0 z-10 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
                className,
                directionClass[direction]
            )}
            {...props}
        >
            <Button onClick={onClick}>
                <FontAwesomeIcon icon={icon} />
            </Button>
        </div>
    );
};