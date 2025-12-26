import { Button, Icon } from "../../../../../shared/components";
import { cn } from "../../../../../shared/utils";
import styles from "./DashboardButtons.module.css";
import { Link } from "react-router-dom";

export const DashboardButton = ({
    children,
    className,
    onClick,
    variant = "outlined",
    size,
    iconOnly = false,
    ...props
}) => {
    return (
        <Button
            className={cn(
                iconOnly ? styles.dashboardIconBtn : styles.dashboardTextBtn,
                className
            )}
            onClick={onClick}
            variant={variant}
            size={size}
            {...props}
        >
            {children}
        </Button>
    );
};

export const ActionMenuButton = ({ children, variant, className, ...props }) => {
    return (
        <Button className={cn(styles.actionMenuBtn, className)} variant={variant} {...props}>
            {children}
        </Button>
    );
};

export const DashboardLink = ({ children, to, className }) => {
    return (
        <Link to={to} className={cn("flex items-center justify-center gap-4", className)}>
            {children}
        </Link>
    );
}

export const SearchButton = (props) => (
    <DashboardButton iconOnly={true} {...props}>
        <Icon.Search />
    </DashboardButton>
);

export const MenuButton = ({ variant = "ghost", props, onClick }) => (
    <DashboardButton variant={variant} iconOnly={true} onClick={onClick} {...props}>
        <Icon.Menu />
    </DashboardButton>
);

export const CloseButton = ({ variant = "destructive", ...props }) => (
    <DashboardButton iconOnly={true} variant={variant} {...props}>
        <Icon.Close />
    </DashboardButton>
);

export const AddButton = ({ variant = "primary", ...props }) => (
    <DashboardButton iconOnly={true} variant={variant} {...props}>
        <Icon.Add />
    </DashboardButton>
);

export const PlayButton = ({ variant = "primary", ...props }) => (
    <DashboardButton iconOnly={true} variant={variant} {...props}>
        <Icon.Play />
    </DashboardButton>
);

export const DeleteButton = ({ variant = "destructive", ...props }) => (
    <DashboardButton iconOnly={true} variant={variant} {...props}>
        <Icon.Delete />
    </DashboardButton>
);

export const MoreOptionsButton = ({ variant = "ghost", ...props }) => (
    <DashboardButton iconOnly={true} variant={variant} {...props}>
        <Icon.MoreOptions />
    </DashboardButton>
);

export const SettingsButton = ({ variant = "ghost", ...props }) => {
    return (
        <ActionMenuButton variant={variant} {...props}>
            <DashboardLink to={"/dashboard/settings"}>
                <Icon.Settings />
                <span>Settings</span>
            </DashboardLink>
        </ActionMenuButton>
    );
};

export const LogoutButton = ({ variant = "destructive", ...props }) => {
    return (
        <ActionMenuButton variant={variant} {...props}>
            <Icon.Logout />
            <span>Logout</span>
        </ActionMenuButton>
    );
};
