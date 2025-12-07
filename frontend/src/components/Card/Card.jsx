import { cn } from "../../utils/classNames";
import styles from "./Card.module.css";

function Card({ children, elementClass, ...props }) {
    const elementStyle = cn(styles.card, elementClass)

    return (
        <article className={elementStyle} {...props}>
            {children}
        </article>
    );
}

function CardHeader({ children, size, elementClass, ...props }) {
    const elementStyleMap = {
        sm: styles.cardSmHeader,
        md: styles.cardMdHeader,
        lg: styles.cardLgHeader,
    };

    const elementStyle = cn(styles.cardHeader, elementStyleMap[size], elementClass);

    const elementMap = {
        sm: "h3",
        md: "h2",
        lg: "h1",
    };

    const Tag = elementMap[size] || "h3";

    return (
        <Tag className={elementStyle} {...props}>
            {children}
        </Tag>
    );
}

function CardBody({ children, elementClass, ...props }) {
    const elementStyle = cn(styles.cardBody, elementClass);

    return (
        <div className={elementStyle} {...props}>
            {children}
        </div>
    );
}

function CardFooter({ children, elementClass = [], ...props }) {
    const elementStyle = cn(styles.cardFooter, elementClass);

    return (
        <div className={elementStyle} {...props}>
            {children}
        </div>
    );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
