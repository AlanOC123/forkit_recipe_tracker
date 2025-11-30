import { Card, Form } from 'react-bootstrap'

function AuthCard({ children }) {
    return (
        <Card>
            <Form>
                { children }
            </Form>
        </Card>
    )
}

export default AuthCard