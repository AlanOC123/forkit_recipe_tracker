import styles from "./DashboardLayout.module.css";
import { cn } from "../../../utils/classNames";
import { Section } from "../../../components/Section/Section";
import { useDashboard } from "../../../context/DashboardContext";
import { useEffect } from "react";

export function DashboardLayout() {
    const { updateHeaderValue } = useDashboard();

    useEffect(() => {
        updateHeaderValue("Forkit")
    }, [])

    return (
        <Section elementClass={cn(styles.dashboard)}>
            <h1>Home</h1>
        </Section>
    );
}
