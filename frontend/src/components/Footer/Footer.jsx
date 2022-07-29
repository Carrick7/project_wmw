//Router Dom
import { NavLink, useNavigate, Link } from 'react-router-dom';
//Redux/Slice
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { reset_sl } from '../../features/shopping_lists/shopping_listSlice';
import { reset_rl } from '../../features/receipt_lists/receipt_listSlice';
import { reset_p } from '../../features/products/productSlice';
//CSS
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
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

  //resetting states when changing pages to avoid crashing
  const onReset = () => {
    dispatch(reset_sl());
    dispatch(reset_rl());
    dispatch(reset_p());
  }

  return (  
    <Container fluid className="main-footer">
      <Col className='footer_title_col'>
        <Link to='/' id='footer_title' onClick={onReset}><FontAwesomeIcon icon={faWallet}/> Watch My Wallet </Link>
      </Col>
      {user ? (
      <Container className="footer_links_container">
        <Row className='row_footer_links'>
          <Col sm={4} className="footer_links_col">
            <NavLink to='/shopping_lists' className='footer_links' onClick={onReset}>
             <FontAwesomeIcon icon={faBasketShopping} className='footer_icons'/> Shopping Lists 
            </NavLink>
            <div />
            <NavLink to='/' className='footer_links' onClick={onReset}>
              <FontAwesomeIcon icon={faHouseChimney} className='footer_icons' /> Home 
            </NavLink>
          </Col>
          <Col sm={4} className="footer_links_col" onClick={onReset}>
            <NavLink to='/products' className='footer_links'>
              <FontAwesomeIcon icon={faLemon} className='footer_icons'/> Products 
            </NavLink>
            <div />
            <NavLink to='/receipt_lists' className='footer_links' onClick={onReset}>
              <FontAwesomeIcon icon={faReceipt} className='footer_icons'/> Receipts 
            </NavLink>
          </Col> 
          <Col sm={4} className="footer_links_col">
            <button id="footer_logout_button" className='footer_links' onClick={onLogout}>
              <FontAwesomeIcon icon={faPersonRunning} className='footer_icons'/> Logout 
            </button>
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