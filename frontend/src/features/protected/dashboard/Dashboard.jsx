import styles from "./Dashboard.module.css"
import { HeaderSection, MainSection } from './components';
import { Provider } from './context'
import { Route } from "react-router-dom";

export const Dashboard = () => {
    return (
        <Provider>
            <div id="dashboard" className={styles.dashboard}>
                <HeaderSection />
                <MainSection />
            </div>
        </Provider>
    );
}