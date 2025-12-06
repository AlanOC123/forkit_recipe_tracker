import { useState } from "react";
import AuthHero from "../components/AuthHero";
import SplitScreenLayout from "../components/SplitScreenLayout";
import { useAuth } from "../../../src/context/AuthContext";
import AuthCard from "../components/AuthCard";
import { Container, Button } from "react-bootstrap";

export function Login() {
    const heroTitle = "Discover your joy of food"
    const heroDescription = "Find your next recipe and Forkit..."
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { loginUser, isLoading } = useAuth();

    const LoginFormInputs = (
        <>
            <AuthCard.FormGroup 
            label={"Username"} 
            placeholder={"Enter Username"} 
            type={"text"} value={username} 
            onChange={setUsername} 
            />
            <AuthCard.FormGroup 
            label={"Password"} 
            placeholder={"Enter Password"} 
            type={"text"} value={password} 
            onChange={setPassword} 
            />
        </>
    )

    const LoginFormButton = (
        <AuthCard.FormButton buttonText={"Submit"}/>
    )

    const LoginFormContent = (
        <Container>
            <AuthCard headerText={"Login"} inputs={LoginFormInputs} controls={LoginFormButton} />
        </Container>
    );

    return (
        <SplitScreenLayout 
            LeftContent={<AuthHero title={heroTitle} description={heroDescription}/>} 
            RightContent={LoginFormContent}
        />
    )
}