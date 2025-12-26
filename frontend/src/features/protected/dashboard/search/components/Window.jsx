import { Modal } from "../../components/DashboardMenus";
import { useSearch } from "../hooks";
import { cloneElement } from "react";
import { SearchBox } from "./SearchBox";
import { SearchHeader } from "./SearchHeader";

const SearchSection = () => {
    return (
        <div className="grid p-2 gap-y-2">
            <SearchHeader />
            <SearchBox />
        </div>
    );
};

export const Window = ({ trigger }) => {
    const { isSearchWindowOpen, closeWindow, openWindow } = useSearch();
    
    const enhancedTrigger = cloneElement(trigger, {
        onClick: (e) => {
            if (trigger.props.onClick) trigger.props.onClick(e);
            openWindow();
        }
    })

    return (
        <Modal
            size="lg"
            trigger={enhancedTrigger}
            children={<SearchSection />}
            isOpen={isSearchWindowOpen}
            closeFn={closeWindow}
        />
    );
};
