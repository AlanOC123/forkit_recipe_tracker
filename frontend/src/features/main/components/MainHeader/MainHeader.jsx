import { IconOnlyButton } from "../../../../components/Button/Button";
import styles from './MainHeader.module.css';
import { cn } from "../../../../utils/classNames";
import { useDashboard } from "../../../../context/DashboardContext";

function MainHeaderLogo() {
    const { pageHeader } = useDashboard();

    return (
        <div className={cn(styles.mainHeaderGroup)}>
            <h3 className={styles.mainHeaderLogoText}>{pageHeader}</h3>
        </div>
    );
}

function MainHeader() {
    const { updateIsSidebarOpen } = useDashboard();

    return (
        <header className={cn(styles.mainHeader)}>
            <IconOnlyButton icon={"menu"} kind={"text"} elementClass="mobile-only" onClick={updateIsSidebarOpen} size="md" />
            <MainHeaderLogo />
        </header>
    );
}

export { MainHeader };
