import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [pageHeader, setPageHeader] = useState('Forkit');

    const updateHeaderValue = (newValue) => setPageHeader(newValue);

    return (
        <DashboardContext.Provider
            value={{
                updateHeaderValue,
                pageHeader
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() { return useContext(DashboardContext); }
