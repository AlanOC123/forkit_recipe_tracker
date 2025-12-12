import styles from "./MainLayout.module.css";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { cn } from "../../../utils/classNames";
import { Outlet } from "react-router-dom";
import { Page } from "../../../components/Page/Page";
import { DashboardProvider } from "../../../context/DashboardContext";

export function MainLayout() {
    return (
        <Page elementClass={cn(styles.main)}>
            <DashboardProvider>
                <Header elementClass={cn(styles.mainHeader)} />
                <Sidebar elementClass={cn(styles.mainSidebar)} />
                <main className={cn(styles.mainWindow)}>
                    <Outlet />
                </main>
            </DashboardProvider>
        </Page>
    );
}