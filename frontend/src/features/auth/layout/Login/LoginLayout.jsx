import { AuthPage } from "../../components/AuthPage/AuthPage";
import {
    EmailInputGroup,
    PasswordInputGroup,
} from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import { ForgotPassword } from "../../components/ForgotPassword/ForgotPassword";
import styles from "./LoginLayout.module.css";
import loginImage from "../../../../assets/login-page.jpg";
import { useState } from "react";
import { cn } from "../../../../utils/classNames";
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginLayout() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await loginUser(formData);
            navigate("/");
        } catch (err) {
            console.log(err);
            if (err.response?.data) {
                setErrors(err.response?.data)
            } else {
                setErrors({ detail: "Something went wrong. Please try again." })
            }
        } finally {
            setIsLoading(false)
        }
    };

    const formInputs = (
        <>
            {errors.detail && <span className={styles.errorMsg}>{errors.detail}</span>}
            <EmailInputGroup
                placeholder={"Whats your email?"}
                inputValue={formData.email}
                labelText={"Email"}
                onChange={(e) => handleChange(e, "email")}
                error={errors.email}
            />
            <PasswordInputGroup
                placeholder={"Whats your password?"}
                inputValue={formData.password}
                labelText={"Password"}
                onChange={(e) => handleChange(e, "password")}
                error={errors.password}
            />
        </>
    );

    const formControls = (
        <ButtonGroup>
            <Button kind={"primary"} onClick={handleLogin}>
                {isLoading ? "Loggin in..." : "Login"}
            </Button>
            <Button kind={"secondary"} href={"/sign-up"}>
                Sign Up
            </Button>
        </ButtonGroup>
    );

    const formSection = (
        <AuthPage.FormSection
            headerText={"Login"}
            inputs={formInputs}
            controls={formControls}
            formBodyClassName={styles.loginFormBody}
        >{<ForgotPassword />}</AuthPage.FormSection>
    );

    return (
        <AuthPage
            elementClass={cn(styles.login)}
            formSection={formSection}
            heroSection={<AuthPage.HeroSection src={loginImage} />}
        />
    );
}
