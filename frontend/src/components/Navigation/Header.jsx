//Router Dom
import { Link, useNavigate } from 'react-router-dom';
//Redux/Slice
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
//CSS
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

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
      <Navbar expand="lg" className='navbar_container'>
        
          <Navbar.Brand id='navbar_title'><FontAwesomeIcon icon={faWallet}/> Watch My Wallet </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* If user is signed in */}
          {user ? (
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav id='nav_links_container'>
             <Link to='/' className='navbar_links'> Home </Link>
             <Link to='/shopping_lists' className='navbar_links'> Shopping Lists </Link>          
             <Link to='/products' className='navbar_links'> Products </Link>                       
             <Link to='/receipt_lists' className='navbar_links'> Receipt Lists </Link>     
             <button id="navbar_logout_button" className='navbar_links' onClick={onLogout}>Logout</button>
            </Nav>
          </Navbar.Collapse>
        ):
        {/* If user is not signed in */}
        (
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="justify-content-end" id='nav_links_container'>
             <Link to='/' className='navbar_links'> Home </Link>  
             <Link to='/login' className='navbar_links'> Login </Link>
            </Nav>
          </Navbar.Collapse>
        )}
      
    </Navbar>
  )
}

export default Header