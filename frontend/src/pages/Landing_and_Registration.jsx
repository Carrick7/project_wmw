import Registration from "../components/Authentication/Registration"
import { Container, Col, Row } from "react-bootstrap";

function Landing_and_Registration() {

  return (
    <Container>
      <Row>
        <Col>
          <Registration />
        </Col>
      </Row>
    </Container>
  )
}

export default Landing_and_Registration