import { cn } from "../../utils/classNames";
import styles from "./Section.module.css";

function SectionHeader({ children, elementClass, ...props }) {
    const elementStyle = cn(styles.sectionHeader, elementClass);

    return (
        <h2 className={elementStyle} {...props}>
            {children}
        </h2>
    );
}

function Section({ children, elementClass, ...props }) {
    const elementStyle = cn(styles.section, elementClass);

    return (
        <section className={elementStyle} {...props}>
            {children}
        </section>
    );
}

Section.Header = SectionHeader;

export { Section };
