import styles from "./MainLayout.module.css";
import { MainHeader } from "../components/MainHeader/MainHeader";
import { MainSidebar } from "../components/MainSidebar/MainSidebar";
import { cn } from "../../../utils/classNames";
import { Outlet } from "react-router-dom";
import { Page } from "../../../components/Page/Page";
import { DashboardProvider } from "../../../context/DashboardContext";

export function MainLayout() {
    return (
        <Page elementClass={cn(styles.main)}>
            <DashboardProvider>
                <MainHeader />
                <MainSidebar />
                <main className={cn(styles.mainWindow)}>
                    <Outlet />
                </main>
            </DashboardProvider>
        </Page>
    );
}