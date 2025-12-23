import styles from './Login.module.css';
import { Provider } from './context';
import { GridContainer, GridSection } from '../../../../shared/components';
import { LoginPageHeader, LoginForm } from './components';

const Login = () => {
    return (
        <Provider>
            <GridContainer className={styles.loginPage}>
                <GridSection className={styles.loginSection}>
                    <LoginPageHeader />
                    <LoginForm />
                </GridSection>
            </GridContainer>
        </Provider>
    )
}

export default Login;