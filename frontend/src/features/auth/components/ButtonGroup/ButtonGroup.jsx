import { cn } from "../../../../utils/classNames";
import styles from "./ButtonGroup.module.css";

export function ButtonGroup({ children, elementClass, ...props }) {
    const elementStyles = cn(styles.buttonGroup, elementClass);

    return (
        <div className={elementStyles} {...props}>
            {children}
        </div>
    );
}
