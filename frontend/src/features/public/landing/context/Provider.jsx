import Context from "./Context";
import { useState } from "react";
import { getFeatureCardsData } from "../constants";

const Provider = ({ children }) => {
    const featureCardsData = getFeatureCardsData();
    const [currFeatureIndex, setCurrFeatureIndex] = useState(0);
    const currFeatureItem = featureCardsData[currFeatureIndex];

    return (
        <Context.Provider
            value={{
                currFeatureItem,
                featureCardsData,
                currFeatureIndex,
                setCurrFeatureIndex,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
