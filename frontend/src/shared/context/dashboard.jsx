import { createContext, useState } from "react";
import { dashboardConstantsAPI } from "../constants";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
    const { getDefaultPageHeader } = dashboardConstantsAPI;
    const [pageHeader, setPageHeader] = useState(getDefaultPageHeader());

    const updateHeaderValue = (newValue) => setPageHeader(newValue);

    return (
        <DashboardContext.Provider value={pageHeader, updateHeaderValue}
    )
}