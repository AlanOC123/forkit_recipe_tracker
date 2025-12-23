import { cn } from '../../../../shared/utils';

export const PageHeader = ({ children }) => {
    return <h1 className={cn("text-2xl pt-4 font-semibold")}>{children}</h1>
}