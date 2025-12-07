import { AuthPage } from "../../components/AuthPage/AuthPage";
import {
    TextInputGroup,
    PasswordInputGroup,
} from "../../../../components/Input/Input";
import { Logo } from "../../../../components/Logo/Logo";
import { Button } from "../../../../components/Button/Button";
import { Card } from "../../../../components/Card/Card";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import { ForgotPassword } from "../../components/ForgotPassword/ForgotPassword";
import { HeroImage } from "../../components/HeroImage/HeroImage";
import styles from "./LoginLayout.module.css";
import { Section } from "../../../../components/Section/Section";
import loginImage from "../../../../assets/login-page.jpg";
import { useState } from "react";

export function LoginLayout() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = (e) => setUsername(e.target.value)
    const updatePassword = (e) => setPassword(e.target.value)

    const formInputs = (
        <>
            <TextInputGroup 
            placeholder={"Whats your name?"} 
            inputValue={username}
            labelText={"Username"}
            onChange={updateUsername}
            />
            <PasswordInputGroup 
            placeholder={"Whats your password?"} 
            inputValue={password}
            labelText={"Password"}
            onChange={updatePassword}
            />
        </>
    )

    const formControls = (
        <ButtonGroup>
            <Button kind={"primary"}>Login</Button>
            <Button kind={"secondary"}>Sign Up</Button>
        </ButtonGroup>
    )

    const formSection = (
        <AuthPage.FormSection headerText={"Login"} inputs={formInputs} controls={formControls}></AuthPage.FormSection>
    );

    return (
        <AuthPage
            elementClasses={[styles.login]}
            formSection={formSection}
            heroSection={<AuthPage.HeroSection src={loginImage} />}
        />
    );
}
