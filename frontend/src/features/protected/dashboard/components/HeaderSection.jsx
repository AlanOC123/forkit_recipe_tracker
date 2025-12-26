import styles from "./styles.module.css";
import { cn } from "../../../../shared/utils";
import { Button, Logo } from "../../../../shared/components";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../shared/hooks";
import { getImage } from "../../../../shared/utils";
import { motion, AnimatePresence, scale, animate } from "framer-motion";
import { useDashboard } from "../hooks/";
import {
    MenuButton,
    CloseButton,
    SearchButton,
    SettingsButton,
    LogoutButton,
} from "./DashboardButtons";
import { ActionMenu } from "./DashboardMenus";
import { SearchWindow } from "../search/SearchWindow";
import { useSearch } from "../search/hooks";

const HeaderIcon = () => {
    return (
        <Button className={styles.headerIconBtn}>
            <Link to={"/dashboard"}>
                <Logo />
            </Link>
        </Button>
    );
};

const NavButton = ({ label, to, isTop }) => {
    const { currPath, closeMobileMenu, closeProfileMenu } = useDashboard();
    const isActive = currPath === to;

    return (
        <Button
            variant={"ghost"}
            className={cn(
                "flex-1 relative",
                styles.headerNavBtn,
                isActive ? styles.isActive : ""
            )}
            onClick={() => {
                closeMobileMenu();
                closeProfileMenu();
            }}
        >
            <Link
                className="z-20 w-full h-full flex items-center justify-center"
                to={to}
            >
                <span>{label}</span>
            </Link>
            {isActive && (
                <motion.span
                    layoutId={`navbar-indicator-${isTop ? "t" : "b"}`}
                    className={cn(
                        "absolute rounded-full z-10 inset-0",
                        styles.navBarIndicator
                    )}
                    transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 1,
                        opacity: 0.3,
                        ease: "easeInOut",
                    }}
                />
            )}
        </Button>
    );
};

const ToggleNavButton = () => {
    const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } =
        useDashboard();

    const motionProps = {
        initial: { opacity: 0, scale: 0.6 },
        animate: { opacity: 1, scale: 1, ease: "easeInOut" },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.3 },
    };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div className="lg:hidden overflow-hidden" {...motionProps}>
                {isMobileMenuOpen ? (
                    <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            bounce: 0.2,
                        }}
                    >
                        <CloseButton onClick={closeMobileMenu} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="open"
                        initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            bounce: 0.2,
                        }}
                    >
                        <MenuButton onClick={openMobileMenu} />
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

const ProfileMenuButton = () => {
    const { user } = useAuth();
    const { avatar_url: avatarUrl } = user;

    return (
        <span
            className={cn(
                "flex items-center justify-center rounded-full shadow-md p-0 overflow-hidden",
                styles.topHeaderProfilePicture
            )}
        >
            <img
                className="cursor-pointer"
                src={getImage(avatarUrl)}
                alt="Profile Picture"
            />
        </span>
    );
};

const ProfileSection = () => {
    const { submitLogout } = useAuth();

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-4 relative",
                styles.topHeaderProfileSection
            )}
        >
            <ToggleNavButton />
            <SearchWindow
                trigger={<SearchButton className={styles.secondarySearchBtn} />}
            />
            <ActionMenu
                trigger={<ProfileMenuButton />}
                children={
                    <>
                        <SettingsButton />
                        <LogoutButton onClick={submitLogout} />
                    </>
                }
            />
        </div>
    );
};

const HeaderNav = ({ isTop }) => {
    const { navLinks } = useDashboard();
    const { openWindow } = useSearch();

    return (
        <nav
            className={cn(
                isTop
                    ? `hidden p-2 lg:inline-flex items-center justify-between rounded-full ${styles.topNav}`
                    : `grid lg:hidden items-center justify-start rounded-2xl p-4 gap-4 ${styles.bottomNav}`
            )}
        >
            <h3 className="lg:hidden text-color-700 font-light text-lg">
                Navigation
            </h3>
            {isTop && (
                <SearchWindow
                    trigger={
                        <SearchButton onClick={openWindow}
                            className={!isTop ? styles.secondarySearchBtn : ""}
                        />
                    }
                />
            )}
            {navLinks.map(({ label, to }, index) => (
                <NavButton label={label} to={to} key={index} isTop={isTop} />
            ))}
        </nav>
    );
};

const TopSection = () => {
    return (
        <div className={cn("p-2 gap-8", styles.topSection)}>
            <HeaderIcon />
            <HeaderNav isTop={true} />
            <ProfileSection />
        </div>
    );
};

const BottomSection = () => {
    const { isMobileMenuOpen } = useDashboard();

    return (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "calc(100% - 80px)" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }} // Faster than height anim for snappy feel
                    className={cn(
                        "relative lg:hidden p-2",
                        styles.bottomSection
                    )}
                >
                    <HeaderNav isTop={false} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const HeaderContainer = ({ children }) => {
    const { isMobileMenuOpen } = useDashboard();

    return (
        <motion.header
            initial={{ height: 80 }}
            animate={{ height: isMobileMenuOpen ? "75dvh" : 80 }}
            exit={{ height: 80 }}
            transition={{
                type: "spring",
                bounce: 0.1,
                duration: 0.6,
                ease: "easeInOut",
            }}
            className={cn(
                "w-full p-0 rounded-b-2xl shadow-lg sticky top-0",
                styles.mainHeader
            )}
        >
            {children}
        </motion.header>
    );
};

export const HeaderSection = () => {
    return (
        <HeaderContainer>
            <TopSection />
            <BottomSection />
        </HeaderContainer>
    );
};
