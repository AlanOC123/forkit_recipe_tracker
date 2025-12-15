import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [pageHeader, setPageHeader] = useState('Forkit');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const updateHeaderValue = (newValue) => setPageHeader(newValue);
    const updateIsSidebarOpen = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <DashboardContext.Provider
            value={{
                updateHeaderValue,
                pageHeader,
                updateIsSidebarOpen,
                isSidebarOpen
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() { return useContext(DashboardContext); }
