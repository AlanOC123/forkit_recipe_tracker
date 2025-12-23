import { AuthCard } from "../../components/AuthCard";
import { GridItem } from "../../../../../shared/components";
import { Link } from "react-router-dom";
import useLogin from '../useLogin';
import {
    Input,
    InputGroup,
    InputError,
} from "../../../../../shared/components";
import { useRef, useState } from "react";

export const LoginForm = () => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const {
        credentials,
        cardHeader,
        isValidEmail,
        updateCredentials,
        submitCredentials,
        updateCardHeader,
    } = useLogin();

    const { email, password } = credentials;

    const emailRef = useRef();
    const passwordRef = useRef();

    const inputGroupings = {
        email: {
            ref: emailRef,
            errorFn: (val) => setEmailError(val),
            headerText: "Enter Email",
            val: email
        },
        password: {
            ref: passwordRef,
            errorFn: (val) => setPasswordError(val),
            headerText: "Enter Password",
            val: password
        },
    };

    const handleChange = (key) => {
        const { ref } = inputGroupings[key];
        updateCredentials(key, ref.current.value);
    };

    const handleFocus = (key) => {
        const { headerText, ref } = inputGroupings[key];
        ref.current.classList.remove('success')
        updateCardHeader(headerText);
    };

    const handleBlur = (key) => {
        if (key === "email") {
            const { ref, errorFn } = inputGroupings[key];

            if (email.length < 2) return;
    
            if (!isValidEmail()) {
                errorFn("Email must include @");
                ref.current.classList.add('error');
                return;
            }

            ref.current.classList.remove("error");
            errorFn('');

            if (isValidEmail()) {
                ref.current.classList.add("success");
            }
            
        }

        if (key === "password") {
            const { ref, errorFn } = inputGroupings["password"];
            ref.current.classList.remove("error");
            errorFn("");

            if (password.length > 8) {
                ref.current.classList.add("success");
            }
        }

        if (email && !emailError && password && !passwordError) updateCardHeader("Good to Go?");
    };

    const handleSubmit = async () => {
        if (!password) {
            const { ref, errorFn } =inputGroupings["password"];
            errorFn("Enter your password...");
            ref.current.classList.add("error");
            ref.current.focus();
        }

        if (!email) {
            const { ref, errorFn } = inputGroupings["email"];
            errorFn("Enter your email...");
            ref.current.classList.add("error");
            ref.current.focus();
        }

        if (!(email || password) || (emailError || passwordError)) {
            return;
        }

        await submitCredentials()
    };

    return (
        <GridItem
            colSpan="full"
            className={
                "grid place-content-center place-items-center w-full h-full"
            }
        >
            <AuthCard>
                <AuthCard.Header>{cardHeader}</AuthCard.Header>
                <AuthCard.Inputs>
                    <InputGroup>
                        <Input
                            type={"email"}
                            value={email}
                            onChange={() => handleChange("email")}
                            onFocus={() => handleFocus("email")}
                            onBlur={() => handleBlur("email")}
                            placeholder={"Email"}
                            ref={emailRef}
                            className={isValidEmail() ? 'success' : ''}
                        />
                        {emailError && <InputError>{emailError}</InputError>}
                    </InputGroup>

                    <InputGroup>
                        <Input
                            type={"password"}
                            value={password}
                            onChange={() => handleChange("password")}
                            onFocus={() => handleFocus("password")}
                            onBlur={() => handleBlur("password")}
                            placeholder={"Password"}
                            ref={passwordRef}
                        />
                        {passwordError && (
                            <InputError>{passwordError}</InputError>
                        )}
                    </InputGroup>
                </AuthCard.Inputs>
                <AuthCard.Controls>
                    <AuthCard.ControlBtn
                        variant={"primary"}
                        onClick={handleSubmit}
                    >
                        Continue
                    </AuthCard.ControlBtn>
                    <AuthCard.ControlBtn variant={"secondary"}>
                        <Link to={"/register"}>Sign Up</Link>
                    </AuthCard.ControlBtn>
                    <AuthCard.ControlBtn variant={"ghost"}>
                        <Link to={"/register"}>Forgot Password?</Link>
                    </AuthCard.ControlBtn>
                </AuthCard.Controls>
            </AuthCard>
        </GridItem>
    );
};
