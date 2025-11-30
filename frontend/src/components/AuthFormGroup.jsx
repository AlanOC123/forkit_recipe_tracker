import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";

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

export default AuthFormGroup;
