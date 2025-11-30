import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Button, Alert, Spinner } from "react-bootstrap";
import AuthFormGroup from "../components/AuthFormGroup";
import AuthCard from "../components/AuthCard";

export function Login() {
    const { loginUser, logoutUser, registerUser, isLoading } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await loginUser({ username, password })
        } catch (err) {
            setUsername('')
            setPassword('')
            setError(err.response?.data?.detail || 'Login Fail')
        }
    };

    return (
        <Container>
            <h1 className="mb-4">Welcome to Forkit</h1>
            <AuthCard>
                {error && <Alert variant="danger">{error}</Alert>}
                <AuthFormGroup
                    label={"Enter Username"}
                    placeholder={"Enter Username"}
                    type="text"
                    value={username}
                    onChange={setUsername}
                />
                <AuthFormGroup
                    label={"Enter Password"}
                    placeholder={"Enter Password"}
                    type="password"
                    onChange={setPassword}
                    value={password}
                />
                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <Button
                        type="submit"
                        variant="primary"
                        className="mb-4"
                        value={password}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </Button>
                )}
                <Button variant="link" className="mb-4">Register</Button>
            </AuthCard>
        </Container>
    );
}
