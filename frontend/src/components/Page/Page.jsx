import styles from './Page.module.css'

export function Page({ children, id, classNames = [], ...props }) {
    const className = [
        styles.page,
        ...classNames
    ]

    return <div className={className} id={id} {...props}>{children}</div>;
}
