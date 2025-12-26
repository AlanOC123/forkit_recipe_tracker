import { Input } from "../../../../../shared/components";
import { cn } from "../../../../../shared/utils";

export const SearchBox = () => {
    return (
        <Input
            className={cn("flex-1")}
            type={"search"}
            placeholder={"Type to Search..."}
        />
    );
};
