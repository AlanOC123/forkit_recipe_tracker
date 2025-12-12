import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpLayout.module.css";
import { TextInputGroup, PasswordInputGroup, EmailInputGroup } from "../../../../components/Input/Input";
import { Button } from "../../../../components/Button/Button";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import { AuthPage } from "../../components/AuthPage/AuthPage";
import signUpImg from '../../../../assets/sign-up-page.jpg'
import { cn } from "../../../../utils/classNames";

export function SignUpLayout() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await registerUser(formData);
            navigate("/");
        } catch (err) {
            console.log(err);
            if (err.response?.data) {
                setErrors(err.response?.data);
            } else {
                setErrors({
                    detail: "Something went wrong. Please try again.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const formInputs = (
        <>
            {errors.detail && (
                <span className={styles.errorMsg}>{errors.detail}</span>
            )}
            <TextInputGroup
                placeholder={"Whats your first name?"}
                inputValue={formData.first_name}
                labelText={"First Name"}
                onChange={(e) => handleChange(e, "first_name")}
                error={errors.first_name}
            />
            <TextInputGroup
                placeholder={"Whats your last name?"}
                inputValue={formData.last_name}
                labelText={"Last Name"}
                onChange={(e) => handleChange(e, "last_name")}
                error={errors.last_name}
            />
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
            <PasswordInputGroup
                placeholder={"Confirm your password"}
                inputValue={formData.confirm_password}
                labelText={"Confirm Password"}
                onChange={(e) => handleChange(e, "confirm_password")}
                error={errors.confirm_password}
            />
        </>
    );

    const formControls = (
        <ButtonGroup>
            <Button kind={"primary"} onClick={handleLogin}>
                {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Button kind={"secondary"} href={"/login"}>Login</Button>
        </ButtonGroup>
    );

    const formSection = (
        <AuthPage.FormSection
            headerText={"Sign Up"}
            inputs={formInputs}
            controls={formControls}
            formBodyClassName={styles.signUpFormBody}
        ></AuthPage.FormSection>
    );

    return (
        <AuthPage
            elementClass={cn(styles.signUp)}
            formSection={formSection}
            heroSection={<AuthPage.HeroSection src={signUpImg} />}
        />
    );
}
