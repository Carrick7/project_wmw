import { Container, Col, Row } from "react-bootstrap";
import Login from "../components/Login/Login"
function Login_page() {
  return (
    <Container>
      <Row>
        <Col>
          <Login />
        </Col>
      </Row>
    </Container>
  )
}

export default Login_page