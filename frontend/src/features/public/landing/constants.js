import {
    faCompass,
    faCodeBranch,
    faAnglesUp,
} from "@fortawesome/free-solid-svg-icons";

const FEATURE_CARDS_DATA = [
    {
        cardColor: "var(--color-primary)",
        cardHeader: "Explore New Recipes",
        cardBody:
            "Discover a world of flavor with our community-curated library. From trending viral hits to timeless classics, find exactly what you're craving with smart filters for ingredients, difficulty, and cook time.",
        cardIcon: faCompass,
    },
    {
        cardColor: "var(--color-secondary)",
        cardHeader: "Recreate Recipes",
        cardBody:
            "Take any recipe and make it your own. Found a great base but want to add a spicy twist? Fork it to your profile, tweak the ingredients, and save your custom version without losing the original.",
        cardIcon: faCodeBranch,
    },
    {
        cardColor: "var(--color-accent)",
        cardHeader: "Level Up Skills",
        cardBody:
            "Turn every meal into a milestone. Earn XP for every dish you cook, unlock badges for mastering specific cuisines, and watch your Chef Stats grow from Novice to Master.",
        cardIcon: faAnglesUp,
    },
];

export const getFeatureCardsData = () => [...FEATURE_CARDS_DATA];
