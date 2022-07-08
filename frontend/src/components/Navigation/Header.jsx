//Dependancies
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //Dispatching Logout Functions
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
  <>
   <Navbar bg="dark" variant="dark">
    <Container>
     <Nav className="me-auto">
      <Row>
       <Col>
        
        {user ? (
          <button className="btn btn-outline-light" onClick={onLogout}>Logout</button>
        ) : (<>
        <Link to='/'>Home</Link> || <Link to='/login'>Login</Link> 
        </>)}
       </Col>
      </Row>
     </Nav>
    </Container>
   </Navbar>
  </>
  )
}

export default Header