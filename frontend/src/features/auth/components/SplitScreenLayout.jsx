import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function SplitScreenLayout({ LeftContent, RightContent }) {
    return (
        <Container fluid className="vh-100">
            <Row className="h-100 align-items-center">

                <Col
                xs={12}
                md={6}
                className="p-0 d-none d-md-block"
                >
                    {LeftContent}
                </Col>

                <Col
                xs={12}
                md={6}
                className='d-flex justify-content-center align-items-center'
                >
                    {RightContent}
                </Col>

            </Row>
        </Container>
    )
}

export default SplitScreenLayout