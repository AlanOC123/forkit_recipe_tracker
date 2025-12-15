import styles from "./MainSidebar.module.css";
import { Sidebar } from "../../../../components/Sidebar/Sidebar";
import { useAuth } from "../../../../context/AuthContext";
import { useDashboard } from "../../../../context/DashboardContext";
import { Logo } from "../../../../components/Logo/Logo";
import { cn } from "../../../../utils/classNames";
import {
    Button,
    IconOnlyButton,
    IconOnlyToggleButton,
} from "../../../../components/Button/Button";
import { getImage } from "../../../../utils/imageUtils";
import { useState } from "react";

function MainSidebarProfileSection() {
    const { user, logoutUser } = useAuth();

    return (
        <div className={cn(styles.mainSidebarGroup, styles.userProfileSnippet)}>
            {user ? (
                <>
                    <div className={styles.userProfile}>
                        <div className={styles.userAvatar}>
                            <img
                                src={getImage(user.avatar_url)}
                                alt="Profile Picture"
                            />
                        </div>
                        <div className={styles.userInfo}>
                            {user.firstName && user.lastName && (
                                <div className={styles.userNameContainer}>
                                    <span
                                        className={styles.userFirstName}
                                    ></span>
                                    <span
                                        className={styles.userLastName}
                                    ></span>
                                </div>
                            )}

                            <div className={styles.profileNameContainer}>
                                <span className={styles.userProfileName}>
                                    {user.username}
                                </span>
                                <IconOnlyButton
                                    onClick={logoutUser}
                                    icon={"logout"}
                                    kind={"secondary"}
                                    variant={"destructive"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.profileControlsContainer}>
                        <IconOnlyButton
                            elementClass={styles.viewProfileButton}
                            icon={"account_circle"}
                            kind={"tertiary"}
                            href={"/me"}
                            size="md"
                        />
                        <IconOnlyButton
                            elementClass={styles.viewProfileButton}
                            icon={"settings"}
                            kind={"tertiary"}
                            href={"/settings"}
                            size="md"
                        />
                    </div>
                </>
            ) : (
                <div className={styles.userNavigation}>
                    <Button kind={"primary"} href="/login" icon={"login"}>
                        Login
                    </Button>
                    <Button
                        kind={"tertiary"}
                        href="/signup"
                        icon={"app_registration"}
                    >
                        Sign Up
                    </Button>
                </div>
            )}
        </div>
    );
}

function MainNavigation() {
    const { user } = useAuth();
    const [showQuickActions, setShowQuickActions] = useState(false);

    return (
        <div className={styles.mainNavigationContainer}>
            <div className={styles.mainNavigationHeaderContainer}>
                <div className={styles.navigationHeader}>
                    <span>Recipes</span>
                    {user && (
                        <IconOnlyToggleButton
                            kind={"tertiary"}
                            icon={"more_vert"}
                            onClick={() =>
                                setShowQuickActions(!showQuickActions)
                            }
                        />
                    )}
                </div>
                {user && (
                    <div
                        className={cn(
                            styles.quickOptions,
                            showQuickActions ? styles.active : styles.hidden
                        )}
                    >
                        <Button kind={"primary"} icon={"add"}>
                            New
                        </Button>
                        <Button
                            kind={"secondary"}
                            icon={"fork_right"}
                        >
                            Fork
                        </Button>
                        <Button kind={"tertiary"} icon={"chef_hat"}>
                            Cookbook
                        </Button>
                    </div>
                )}
            </div>
            <nav className={styles.mainNavigation}>
                <Button
                    kind={"text"}
                    icon={"home"}
                    elementClass={styles.navBtn}
                    href={'/'}
                >
                    Home
                </Button>
                <Button
                    kind={"text"}
                    icon={"kebab_dining"}
                    elementClass={styles.navBtn}
                    href={'/cuisines'}
                >
                    Cuisines
                </Button>
                <Button
                    kind={"text"}
                    icon={"nest_clock_farsight_analog"}
                    elementClass={styles.navBtn}
                    href={'/courses'}
                >
                    Courses
                </Button>
                <Button
                    kind={"text"}
                    icon={"search"}
                    elementClass={styles.navBtn}
                    href={'/search'}
                >
                    Search
                </Button>
            </nav>
        </div>
    );
}

function MainSidebarHeader() {
    const { updateIsSidebarOpen } = useDashboard();

    return (
        <Sidebar.Header elementClass={styles.mainSidebarHeader}>
            <div
                className={cn(
                    styles.mainSidebarHeaderContent,
                )}
            >
                <Logo elementClass={cn(styles.mainSidebarHeaderLogo)} />
                <IconOnlyButton
                    kind="text"
                    icon="menu"
                    elementClass={cn(styles.toggleSidebarBtn)}
                    onClick={updateIsSidebarOpen}
                />
            </div>
        </Sidebar.Header>
    );
}

function MainSidebarBody() {
    return (
        <Sidebar.Body elementClass={styles.mainSidebarBody}>
            <MainSidebarProfileSection />
            <MainNavigation />
        </Sidebar.Body>
    );
}

function MainSidebarFooter() {
    return (
        <Sidebar.Footer elementClass={styles.mainSidebarFooter}>
            <span className={styles.mainSidebarFooterHeader}>More</span>
            <Button icon={"info"} kind={"text"} elementClass={styles.navBtn}>
                About
            </Button>
            <Button icon={"email"} kind={"text"} elementClass={styles.navBtn}>
                Contact
            </Button>
            <Button icon={"map"} kind={"text"} elementClass={styles.navBtn}>
                Sitemap
            </Button>
        </Sidebar.Footer>
    );
}

function MainSidebar() {
    const { isSidebarOpen, updateIsSidebarOpen } = useDashboard();
    const { user } = useAuth();

    return isSidebarOpen ? (
        <Sidebar elementClass={cn(styles.mainSidebar, styles.expanded)}>
            <MainSidebarHeader />
            <MainSidebarBody />
            <MainSidebarFooter />
        </Sidebar>
    ) : (
        <Sidebar elementClass={cn(styles.mainSidebar, styles.collapsed)}>
            <Sidebar.Header className={styles.collapsedSidebarHeader}>
                <div className={styles.collapsedHeaderLogo}>
                    <Logo />
                </div>
                <IconOnlyButton
                    icon={"menu"}
                    kind={"text"}
                    onClick={updateIsSidebarOpen}
                />
            </Sidebar.Header>
            <Sidebar.Body elementClass={styles.collapsedSidebarBody}>
                <IconOnlyButton
                    kind={"tertiary"}
                    icon={"search"}
                    href={"/search"}
                />
                {user && <IconOnlyButton icon={"add"} kind={"primary"} />}
                <IconOnlyButton icon={"home"} href={"/"} kind={"tertiary"} />
            </Sidebar.Body>
            <Sidebar.Footer elementClass={styles.collapsedSidebarFooter}>
                {!user && (
                    <IconOnlyButton
                        kind={"primary"}
                        icon={"login"}
                        href={"/login"}
                    />
                )}
                {user && <IconOnlyButton kind={"text"} icon={"settings"} />}
            </Sidebar.Footer>
        </Sidebar>
    );
}

export { MainSidebar };
