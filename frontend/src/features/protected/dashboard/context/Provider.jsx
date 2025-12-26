import Context from "./Context";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetaData, getHeaderNavItems } from "../constants";

const PAGE_METADATA = getPageMetaData();
const NAV_LINKS = getHeaderNavItems();

const Provider = ({ children }) => {
    const location = useLocation();

    const currPath = location.pathname;
    const pageData = PAGE_METADATA[currPath];
    const navLinks = NAV_LINKS;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const { header } = pageData;

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const openMobileMenu = () => setIsMobileMenuOpen(true);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
    const openProfileMenu = () => setIsProfileMenuOpen(true);
    const closeProfileMenu = () => setIsProfileMenuOpen(false);

    const checkIsActive = (path) => {
        if (path === '/dashboard') {
            return currPath === '/dashboard'
        }

        return currPath.startsWith(path)
    }

    return (
        <Context.Provider
            value={{
                navLinks,
                header,
                currPath,
                isMobileMenuOpen,
                isProfileMenuOpen,
                checkIsActive,
                toggleMobileMenu,
                openMobileMenu,
                closeMobileMenu,
                toggleProfileMenu,
                openProfileMenu,
                closeProfileMenu
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
