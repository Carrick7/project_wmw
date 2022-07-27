//Router Dom
import { NavLink, useNavigate, Link } from 'react-router-dom';
//Redux/Slice
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
//CSS
import './Footer.css';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faHouseChimney, faBasketShopping, faLemon, faReceipt, faPersonRunning, faUser  } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
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
    <Container fluid className="main-footer">
      <Col className='footer_title_col'>
        <Link to='/' id='footer_title'><FontAwesomeIcon icon={faWallet}/> Watch My Wallet </Link>
      </Col>
      {user ? (
      <Container className="footer_links_container">
        <Row className='row_footer_links'>
          <Col sm={4}><NavLink to='/shopping_lists' className='footer_links'>
            <FontAwesomeIcon icon={faBasketShopping} className='footer_icons'/> Shopping Lists </NavLink>
            <br />
            <NavLink to='/' className='footer_links'><FontAwesomeIcon icon={faHouseChimney} className='footer_icons' /> Home </NavLink>
          </Col>
          <Col sm={4}>
            <NavLink to='/products' className='footer_links'><FontAwesomeIcon icon={faLemon} className='footer_icons'/> Products </NavLink>
            <br />
            <NavLink to='/receipt_lists' className='footer_links'><FontAwesomeIcon icon={faReceipt} className='footer_icons'/> Receipts </NavLink>
          </Col> 
          <Col sm={4} >
            <button id="footer_logout_button" className='footer_links' onClick={onLogout}><FontAwesomeIcon icon={faPersonRunning} className='footer_icons'/> Logout </button>
          </Col>
        </Row>
      </Container>
        ):(
          <Container className="footer_links_container">
          <Row className='row_footer_links'>
          <Col sm={6}>
           <NavLink to='/' className='footer_links'><FontAwesomeIcon icon={faHouseChimney} className='footer_icons'/> Home </NavLink>
          </Col>
          <Col sm={6}>
           <NavLink to='/login' className='footer_links'><FontAwesomeIcon icon={faUser} className='footer_icons'/> Login </NavLink>
          </Col>
        </Row> 
        </Container>   
      )}
      <Container fluid className="footer_copyright">
          <Col>
            <span>Copyright &copy; {new Date().getFullYear()} Watch My Wallet</span>
          </Col>
      </Container>
    </Container>
  )
}

export default Footer