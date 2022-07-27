//Router Dom
import { NavLink, useNavigate, Link } from 'react-router-dom';
//Redux/Slice
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { reset_sl } from '../../features/shopping_lists/shopping_listSlice';
import { reset_rl } from '../../features/receipt_lists/receipt_listSlice';
import { reset_p } from '../../features/products/productSlice';
//CSS
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faHouseChimney, faBasketShopping, faReceipt, faPersonRunning, faLemon, faBurger, faUser } from '@fortawesome/free-solid-svg-icons'

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

  //resetting states when changing pages to avoid crashing
  const onReset = () => {
    dispatch(reset_sl());
    dispatch(reset_rl());
    dispatch(reset_p());
  }
  
  return (
      <Navbar expand="lg" className='navbar_container'>
       <Navbar.Brand id='navbar_title_col'>
        <Link to='/' id='navbar_title' onClick={onReset}><FontAwesomeIcon icon={faWallet}/> Watch My Wallet </Link>
        </Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" id='navbar_toggle'>
        <FontAwesomeIcon icon={faBurger} size="lg" className='navbar_icons' id='navbar_burger'/>
       </Navbar.Toggle>
       {/* If user is signed in */}
       {user ? (
       <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
         <Nav id='nav_links_container'>
          <NavLink to='/' className='navbar_links' onClick={onReset}>
            <FontAwesomeIcon icon={faHouseChimney} className='navbar_icons' /> Home 
          </NavLink>
          <NavLink to='/shopping_lists' className='navbar_links' onClick={onReset}>
            <FontAwesomeIcon icon={faBasketShopping} className='navbar_icons'/> Shopping Lists 
          </NavLink>          
          <NavLink to='/products' className='navbar_links' onClick={onReset}>
            <FontAwesomeIcon icon={faLemon} className='navbar_icons'/> Products 
          </NavLink>                       
          <NavLink to='/receipt_lists' className='navbar_links' onClick={onReset}>
            <FontAwesomeIcon icon={faReceipt} className='navbar_icons'/> Receipts 
          </NavLink>     
          <button id="navbar_logout_button" className='navbar_links' onClick={onLogout}>
            <FontAwesomeIcon icon={faPersonRunning} className='navbar_icons'/> Logout 
          </button>
         </Nav>
       </Navbar.Collapse>
     ):(
       <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        {/* If user is not signed in */}
         <Nav className="justify-content-end" id='nav_links_container'>
          <NavLink to='/' className='navbar_links'><FontAwesomeIcon icon={faHouseChimney} className='navbar_icons'/> Home </NavLink>
          <NavLink to='/login' className='navbar_links'><FontAwesomeIcon icon={faUser} className='navbar_icons'/> Login </NavLink>
         </Nav>
       </Navbar.Collapse>
     )}
    </Navbar>
  )
}

export default Header