import {
    GridSection,
    GridItem,
    Carousel,
    Button,
} from "../../../../shared/components";
import { cn } from "../../../../shared/utils";
import styles from "./styles.module.css";
import { useState, useEffect, cloneElement } from "react";
import { useLandingPage } from "../../../../shared/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FeatureCard = ({ cardData }) => {
    if (!cardData) return;

    const { cardColor, cardHeader, cardBody, cardIcon } = cardData;

    return (
        <div
            className={cn(
                styles.featureCard,
                "h-full rounded-2xl shadow-2xl grid place-content-evenly place-items-center-safe gap-12"
            )}
            style={{
                background: `radial-gradient(ellipse at bottom left, color-mix(in oklab, ${cardColor}, black 35%), color-mix(in oklab, ${cardColor}, black 5%))`,
            }}
        >
            <FontAwesomeIcon
                className={cn("text-6xl")}
                style={{
                    color: `color-mix(in oklab, ${cardColor}, white 40%)`,
                }}
                icon={cardIcon}
            />
            <div className="flex items-center justify-center gap-4 flex-col">
                <h2
                    className="text-2xl font-bold inline-flex items-center justify-center"
                    style={{
                        color: `color-mix(in oklab, ${cardColor}, white 80%)`,
                    }}
                >
                    {cardHeader}
                </h2>
                <p
                    className={
                        "text-base w-72 flex items-center justify-center text-center"
                    }
                    style={{
                        color: `color-mix(in oklab, ${cardColor}, white 60%)`,
                    }}
                >
                    {cardBody}
                </p>
            </div>
            <Button variant={"secondary"}>
                <Link to={"register"}>Sign Up Today!</Link>
            </Button>
        </div>
    );
};

const FeatureButton = ({ item, index }) => {
    const { cardHeader, cardIcon, cardColor } = item;
    const { setCurrFeatureIndex, currFeatureIndex } = useLandingPage();
    const isActive = currFeatureIndex === index;
    console.log(isActive);

    return (
        <Button
            onClick={() => setCurrFeatureIndex(index)}
            className={cn(
                "w-full h-full rounded-lg max-w-full gap-12",
                styles.featureButton,
                isActive ? styles.isActive : ""
            )}
            style={{ color: `color-mix(in oklab, ${cardColor}, black 10%)` }}
            id={`btn-${index}`}
        >
            <FontAwesomeIcon
                className={cn("text-4xl md:text-3xl")}
                icon={cardIcon}
            />
            <h3 className="hidden md:inline-block">{cardHeader}</h3>
        </Button>
    );
};

const FeaturesGrid = () => {
    const { currFeatureItem, featureCardsData } = useLandingPage();

    return (
        <div className={cn("p-4 flex-1 h-full", styles.featuresGrid)}>
            <div className={cn("p-4")}>
                <FeatureCard cardData={currFeatureItem} />
            </div>
            <div className={cn(styles.gridPreviewItems, "flex p-2 gap-2")}>
                {featureCardsData.map((data, index) => (
                    <FeatureButton key={index} index={index} item={data} />
                ))}
            </div>
        </div>
    );
};

export const FeaturesGridSection = () => {
    return (
        <GridSection
            className={cn(styles.featuresGridSection, "gap-y-4")}
            id={"features"}
        >
            <GridItem>
                <h1
                    className={cn(
                        "p-2 mt-4 text-xl md:text-2xl lg:text-3xl flex items-center font-light"
                    )}
                >
                    EXPLORE NEW CUISINES, LEVEL UP YOUR SKILLS
                </h1>
            </GridItem>
            <GridItem
                colSpan="full"
                className={cn("flex items-center justify-center")}
            >
                <FeaturesGrid />
            </GridItem>
        </GridSection>
    );
};
