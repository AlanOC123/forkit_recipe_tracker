import styles from "./Page.module.css";
import { cn } from "../../utils/classNames";

function PageHeader({ children }) {
    return <h1 className={styles.pageHeader}>{children}</h1>;
}

function Page({ children, id, elementClass, ...props }) {
    return (
        <main className={cn(styles.page, elementClass)} id={id} {...props}>
            {children}
        </main>
    );
}

Page.Header = PageHeader;

export { Page };
