import styles from "./Dashboard.module.css";
import { HeaderSection, MainSection } from "./components";
import { Provider as DashboardProvider } from "./context";
import { Provider as SearchProvider } from "./search/context";
import { Route } from "react-router-dom";

export const Dashboard = () => {
    return (
        <DashboardProvider>
            <SearchProvider>
                <div id="dashboard" className={styles.dashboard}>
                    <HeaderSection />
                    <MainSection />
                </div>
            </SearchProvider>
        </DashboardProvider>
    );
};
