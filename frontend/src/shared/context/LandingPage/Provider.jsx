import Context from "./Context";
import { useState } from "react";
import { landingPageConstants } from "../../constants";

const Provider = ({ children }) => {
    const { getFeatureCardsData } = landingPageConstants;

    const featureCardsData = getFeatureCardsData();
    const [currFeatureIndex, setCurrFeatureIndex] = useState(0);
    const currFeatureItem = featureCardsData[currFeatureIndex];

    return (
        <Context.Provider
            value={{ currFeatureItem, featureCardsData, currFeatureIndex, setCurrFeatureIndex }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
