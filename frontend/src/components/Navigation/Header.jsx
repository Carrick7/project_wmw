//Dependancies
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
  <>
   <Navbar bg="dark" variant="dark">
    <Container>
     <Nav className="me-auto">
      <Row>
       <Col>
        <Link to='/'>Home</Link> || <Link to='/login'>Login</Link>
       </Col>
      </Row>
     </Nav>
    </Container>
   </Navbar>
  </>
  )
}

export default Header