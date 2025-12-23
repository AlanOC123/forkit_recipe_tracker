import { Outlet } from "react-router-dom"
import styles from './styles.module.css'

export const MainSection = () => {
    return (
        <main className={styles.mainWindow}>
            <Outlet />
        </main>
    )
}