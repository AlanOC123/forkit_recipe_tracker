import { useRef } from "react";
import { cn } from "../../utils";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CarouselControlButton } from "./CarouselControlButton";

export const Carousel = ({ items, renderItem, className }) => {
    const scrollContainer = useRef(null);

    const scroll = (direction) => {
        const container = scrollContainer.current;
        if (!container) return;

        const scrollAmount = container.clientWidth * 0.8;

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behaviour: "smooth",
        });
    };

    return (
        <div className={cn("relative group", className)}>
            <CarouselControlButton
                direction={"left"}
                onClick={() => scroll("left")}
                icon={faArrowLeft}
            />

            <div
                ref={scrollContainer}
                className={
                    "h-full w-full flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                }
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="snap-center shrink-0 first:pl-4 last:pr-4"
                    >
                        {renderItem(item)}
                    </div>
                ))}
            </div>

            <CarouselControlButton
                direction={"right"}
                onClick={() => scroll("left")}
                icon={faArrowRight}
            />
        </div>
    );
};
