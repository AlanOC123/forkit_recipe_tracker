import { Card, Form, FloatingLabel, Button } from 'react-bootstrap';

function AuthFormGroup({ label, error, placeholder, value, onChange, type }) {
    return (
        <Form.Group>
            <FloatingLabel label={label}>
                <Form.Control
                    type={type}
                    required
                    placeholder={placeholder}
                    className="mb-3"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </FloatingLabel>
            {error && <Alert variant="danger">{error}</Alert>}
        </Form.Group>
    );
}

function AuthFormButton({ buttonText }) {
    return (
        <Button className='mb-4' type='submit'>{buttonText}</Button>
    )
}

function AuthCard({ inputs, headerText, controls }) {
    return (
        <Card>
            <Form>
                <Card.Header>{headerText}</Card.Header>
                <Card.Body>{inputs}</Card.Body>
                <Card.Footer>{controls}</Card.Footer>
            </Form>
        </Card>
    );
}

AuthCard.FormGroup = AuthFormGroup;
AuthCard.FormButton = AuthFormButton;

export default AuthCard

            // <AuthCardBody>
            //     {error && <Alert variant="danger">{error}</Alert>}
            //     <AuthFormGroup
            //         label={"Enter Username"}
            //         placeholder={"Enter Username"}
            //         type="text"
            //         value={username}
            //         onChange={setUsername}
            //     />
            //     <AuthFormGroup
            //         label={"Enter Password"}
            //         placeholder={"Enter Password"}
            //         type="password"
            //         onChange={setPassword}
            //         value={password}
            //     />
            //     {isLoading ? (
            //         <Spinner animation="border" role="status">
            //             <span className="visually-hidden">Loading...</span>
            //         </Spinner>
            //     ) : (
            //         <Button
            //             type="submit"
            //             variant="primary"
            //             className="mb-4"
            //             value={password}
            //             onClick={(e) => handleSubmit(e)}
            //             disabled={!(username && password)}
            //         >
            //             Submit
            //         </Button>
            //     )}
            //     <Button variant="link" className="mb-4">
            //         Register
            //     </Button>
            // </AuthCardBody>