//Router Dom
import { Link, useNavigate } from 'react-router-dom';
//Redux/Slice
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { reset_rl, getAllReceiptLists } from '../../features/receipt_lists/receipt_listSlice';
//Components

//CSS
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';

function Header() {
  //Initialising dispatch & navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //geting state from redux store
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
        {/*What they user sees whether they're logged in*/}
        {user ? (
           <Col>
            <button className="btn btn-outline-light" onClick={onLogout}>Logout</button>
            <Link to='/shopping_lists'> Shopping List </Link> || 
            <Link to='/'> Home </Link> || 
            <Link to='/receipt_lists'> Receipt List </Link>
           </Col>  
            ):(
             <> 
              <Link to='/'>Home</Link> || <Link to='/login'>Login</Link> 
             </>
            )
        }
       </Col>
      </Row>
     </Nav>
    </Container>
   </Navbar>
  </>
  )
}

export default Header