import { useState } from "react";
import { Logo } from "../../../../components/Logo/Logo";
import styles from "./Sidebar.module.css";
import {
    Button,
    IconOnlyButton,
    IconOnlyToggleButton,
} from "../../../../components/Button/Button";
import { cn } from "../../../../utils/classNames";

function SidebarHeader() {}

function SidebarGroup() {}

function SidebarFooter() {}

function CollapsedView({ isShown, expandFn }) {
    return (
        <div className={styles.collapsedView}>
            <div className={styles.collapsedGroup}>
                <IconOnlyToggleButton
                    icon={"menu"}
                    kind={"tertiary"}
                    initialToggleState={isShown}
                    onClick={expandFn}
                    size="xs"
                />
                <IconOnlyButton icon={"add"} kind={"text"} size="xs" />
                <IconOnlyButton icon={"dashboard"} kind={"text"} size="xs" href={'/'} />
            </div>

            <div className={styles.collapsedGroup}>
                <IconOnlyButton
                    icon={"search"}
                    href={"/search"}
                    kind={"text"}
                    size="xs"
                />
                <IconOnlyButton icon={"settings"} kind={"text"} size="xs" />
            </div>
        </div>
    );
}

function MainNavigation() {
    return (
        <div className={styles.sidebarNavContainer}>
            <p className={styles.navHeader}>What are you feeling?</p>
            <nav className={styles.sidebarNav}>
                <Button icon={"chef_hat"} kind={"text"} size="xs">
                    My Recipes
                </Button>
                <Button icon={"japanese_curry"} kind={"text"} size="xs">
                    Cuisine
                </Button>
                <Button icon={"timelapse"} kind={"text"} size="xs">
                    Course
                </Button>
                <Button icon={"draw_abstract"} kind={"text"} size="xs">
                    Something New
                </Button>
            </nav>
        </div>
    );
}

function SecondaryNavigation() {
    return (
        <div className={styles.sidebarNavContainer}>
            <p className={styles.navHeader}>Something else?</p>
            <nav className={styles.sidebarNav}>
                <Button icon={"search"} kind={"text"} size="xs">
                    Search
                </Button>
                <Button icon={"settings"} kind={"text"} size="xs">
                    Settings
                </Button>
                <Button icon={"call"} kind={"text"} size="xs">
                    Contact Us
                </Button>
                <Button icon={"draw_abstract"} kind={"text"} size="xs">
                    Something New
                </Button>
                <Button href={"/logout"} icon={"logout"} kind={"text"} size="xs">
                    Logout
                </Button>
            </nav>
        </div>
    );
}

function ExpandedView({ isShown, collapseFn }) {
    return (
        <div className={styles.expandedView}>
            <div className={cn(styles.expandedGroup, styles.collapseBtn)}>
                <IconOnlyToggleButton
                    icon={"close"}
                    kind={"tertiary"}
                    size="xs"
                    initialToggleState={isShown}
                    onClick={collapseFn}
                />
                <span className={styles.collapseSidebarText}>Close</span>
            </div>
            <div className={cn(styles.expandedGroup)}>
                <Button kind={"secondary"} icon={"add"} size="xs" elementClass={styles.createRecipe}>New Recipe</Button>
                <IconOnlyButton kind={"text"} icon={"fork_right"} size="xs" />
            </div>
            <MainNavigation />
            <SecondaryNavigation />
        </div>
    );
}

function Sidebar({ elementClass, ...props }) {
    const [isShown, setIsShown] = useState(false);

    const updateIsShown = () => setIsShown(!isShown);

    return (
        <aside
            className={cn(
                styles.sidebar,
                elementClass,
                isShown ? styles.expanded : styles.collapsed
            )}
            {...props}
        >
            {isShown ? (
                <ExpandedView collapseFn={updateIsShown} isShown={isShown} />
            ) : (
                <CollapsedView expandFn={updateIsShown} isShown={isShown} />
            )}
        </aside>
    );
}

export { Sidebar };
