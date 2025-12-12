import { useAuth } from "../../../../context/AuthContext";
import { Button, IconOnlyButton } from "../../../../components/Button/Button";
import { SearchInputGroup } from "../../../../components/Input/Input";
import { Logo } from "../../../../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { cn } from "../../../../utils/classNames";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useDashboard } from "../../../../context/DashboardContext";

function HeaderLogo() {
    const { pageHeader } = useDashboard();

    return (
        <div className={cn(styles.headerGroup)}>
            <h3 className={styles.headerLogoText}>{pageHeader}</h3>
        </div>
    );
}

function HeaderLoggedInView({ user }) {
    return (
        <div className={cn(styles.headerLoggedInView)}>
            <p className={styles.headerUserName}>{user?.username}</p>
            <div className={styles.headerProfilePicture}></div>
            <IconOnlyButton icon={"arrow_drop_down"} kind={"text"}/>
        </div>
    )
}

function HeaderLoggedOutView() {
    return (
        <div className={cn(styles.HeaderLoggedOutView)}>
            <IconOnlyButton icon={"login"} kind={"primary"}/>
            <IconOnlyButton icon={"app_registration"} kind={"tertiary"}/>
        </div>
    )
}

function Header({ elementClass, ...props }) {
    const { user } = useAuth();

    return (
        <header className={cn(styles.header, elementClass)} {...props}>
            <HeaderLogo />
            {user ? <HeaderLoggedInView user={user} /> : <HeaderLoggedOutView />}
        </header>
    );
}

Header.HeaderLogo = HeaderLogo;

export { Header };
