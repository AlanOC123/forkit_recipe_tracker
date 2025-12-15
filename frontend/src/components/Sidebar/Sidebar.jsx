import styles from "./Sidebar.module.css";
import { cn } from "../../utils/classNames";

function SidebarHeader({ children, elementClass, ...props }) {
    return (
        <div className={cn(StyleSheet.sideBarHeader, elementClass)} {...props}>
            {children}
        </div>
    );
}

function SidebarGroup({ children, elementClass, ...props }) {
    return (
        <div className={cn(styles.sidebarGroup, elementClass)} {...props}>
            {children}
        </div>
    );
}

function SidebarBody({ children, elementClass, ...props }) {
    return (
        <div className={cn(styles.sidebarBody, elementClass)} {...props}>
            {children}
        </div>
    )
}

function SidebarFooter({ children, elementClass, ...props }) {
    return (
        <div className={cn(styles.sidebarFooter, elementClass)} {...props}>
            {children}
        </div>
    );
}

function Sidebar({ children, elementClass, ...props }) {
    return (
        <aside className={cn(styles.sidebar, elementClass)} {...props}>
            {children}
        </aside>
    );
}

Sidebar.Header = SidebarHeader
Sidebar.Body = SidebarBody
Sidebar.Group = SidebarGroup
Sidebar.Footer = SidebarFooter

export { Sidebar };