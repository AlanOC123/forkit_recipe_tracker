import styles from './Login.module.css';
import { LoginContext } from '../../../../shared/context';
import { GridContainer, GridSection } from '../../../../shared/components';
import { LoginPageHeader, LoginForm } from './components';

const Login = () => {
    return (
        <LoginContext.Provider>
            <GridContainer className={styles.loginPage}>
                <GridSection className={styles.loginSection}>
                    <LoginPageHeader />
                    <LoginForm />
                </GridSection>
            </GridContainer>
        </LoginContext.Provider>
    )
}

export default Login;