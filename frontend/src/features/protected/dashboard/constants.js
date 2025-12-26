const DEFAULT_PAGE_HEADER = "Forkit";

const HEADER_NAV_ITEMS = [
    { label: "Home", to: "/dashboard" },
    { label: "Cuisines", to: "/dashboard/cuisines" },
    { label: "Courses", to: "/dashboard/courses" },
    { label: "My Cookbook", to: "/dashboard/cookbook" },
]

const PAGE_METADATA = {
    "/dashboard": {
        header: "Home",
        location: "/dashboard",
        label: "Home"
    },
    "/dashboard/courses": {
        header: "Courses",
        location: "/dashboard/courses",
        label: "Courses"
    },
    "/dashboard/cuisines": {
        header: "Cuisines",
        location: "/dashboard/cuisines",
        label: "Cuisines"
    },
    "/dashboard/cookbook": {
        header: "My Cookbook",
        location: "/dashboard/cookbook",
        label: "My Cookbook"
    },
};

export const getDefaultPageHeader = () => DEFAULT_PAGE_HEADER;
export const getHeaderNavItems = () => [...HEADER_NAV_ITEMS];
export const getPageMetaData = () => ({ ...PAGE_METADATA });