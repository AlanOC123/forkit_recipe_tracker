import { cn } from "../../../../../shared/utils";
import { MoreOptionsButton } from "../../components/DashboardButtons/DashboardButtons";
import { ActionMenu } from "../../components/DashboardMenus";
import styles from './styles.module.css';

export const SearchHeader = () => {
    return (
        <div className={cn("flex items-center justify-between")}>
            <h3>Search</h3>
            <ActionMenu trigger={<MoreOptionsButton />} isTopAligned={true}>
                <div className={cn("grid gap-2 p-2 rounded-2xl", styles.recentSearchMenu)}>
                    <p>Item 1</p>
                    <p>Item 2</p>
                    <p>Item 3</p>
                    <p>Item 4</p>
                </div>
            </ActionMenu>
        </div>
    );
}