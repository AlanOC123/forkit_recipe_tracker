import styles from './ActionText.module.css'

export function ActionText({ children }) {
    return (
        <h1 className={styles.actionText}>{children}</h1>
    )
}