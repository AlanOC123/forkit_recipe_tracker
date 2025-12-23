import styles from "./Register.module.css";
import { Provider } from "./context";
import {
    GridContainer,
    GridSection,
    GridItem,
} from "../../../../shared/components";
import { getRegistrationSteps } from "./constants";
import { DataEntry, Controls, StageSelector } from "./components";
import useRegister from "./useRegister";
import { PageHeader, AuthCard } from "../../auth/components";

const ALL_STEPS = getRegistrationSteps();

const RegisterPageHeader = () => {
    return (
        <GridItem colSpan="full">
            <PageHeader>Register</PageHeader>
        </GridItem>
    );
};

export const RegisterForm = () => {
    const { currStepIndex } = useRegister();
    const { id } = ALL_STEPS[currStepIndex];

    return (
        <GridItem
            colSpan="full"
            className={
                "grid place-content-center place-items-center w-full h-full"
            }
        >
            <AuthCard>
                <DataEntry sectionKey={id} />
                <StageSelector stepsConfig={ALL_STEPS} />
                <Controls />
            </AuthCard>
        </GridItem>
    );
};

const Register = () => {
    return (
        <Provider>
            <GridContainer className={styles.registerPage}>
                <GridSection className={styles.registerSection}>
                    <RegisterPageHeader />
                    <RegisterForm />
                </GridSection>
            </GridContainer>
        </Provider>
    );
};

export default Register;
