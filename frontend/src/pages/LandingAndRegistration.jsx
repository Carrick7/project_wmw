import { useEffect } from "react";
//Components
import Registration from "../components/Authentication/Registration";
import HomePageFeatures from "../components/HopePageFeatures/Home_Page_Features";
//Redux/Slice
import { useSelector, useDispatch } from 'react-redux';
import { reset_sl } from '../features/shopping_lists/shopping_listSlice';
import { reset_rl } from '../features/receipt_lists/receipt_listSlice';
import { reset_p } from '../features/products/productSlice';
//CSS
import './pages_css/Landing_and_Registration.css'
import { Container, Col, Row, Card, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons';
//Images
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.png";


function LandingAndRegistration() {

//fetching state from redux
const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //resetting states when changing pages to avoid crashing when a user inputs an error
  useEffect (() => {
    dispatch(reset_sl());
    dispatch(reset_rl());
    dispatch(reset_p());
  }, []);

  return (
    <> 
    {/*Title, Logo and Image*/}
     <Container fluid id="home_banner_container">
        <Row>
        <Col lg={4}>
          <h1 id="banner_title"><FontAwesomeIcon icon={faWallet} className='highlight'/> Watch My Wallet </h1>
          <Col className="banner_text_col">
            <span className="banner_text"> 
              A Web Application designed to be your free budgeting tool for grocery shopping. 
            </span> 
          </Col>
          <Row className="scroll_down_buttons_row">
            <Col><button className="scroll_down_buttons"><a href="#about_us_target"> About Us</a></button></Col>
            <Col><button className="scroll_down_buttons"><a href="#features_target"> Features </a></button></Col>
            {/* if user is signed in, the button to scroll down to sign up is not shown        */}
            {user ? (
              <></> 
            ):(
              <> 
                <Col><button className="scroll_down_buttons"><a href="#sign_up_target"> Register </a></button></Col>
              </>
             )}
          </Row>
        </Col>
        {/*Structure of Image*/}
        <Col lg={8}> 
         <Card id='card_banner'> 
          <Card.Img src={img1} id='home_image' alt="Card image" />
          <Card.ImgOverlay className='image_overlay'>
            {/* Image Source */}      
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  <Popover.Body>
                  <a href='https://www.freepik.com/vectors/supermarket' target={"_blank"} rel="noreferrer">Supermarket vector created by pch.vector - www.freepik.com</a>
                  </Popover.Body>
                </Popover>
              }>
              <button className="image_source_button">Image Source</button>
            </OverlayTrigger>
           </Card.ImgOverlay>
          </Card>
         </Col>
        </Row>
      </Container>

      {/*About Us*/}
      <Container fluid id="about_us_container">
        <Row >
          <Col xxl={9}>
            <div id="about_us_target"/>
            <h1 id="about_us_title">About Us</h1>
            <Col className="about_us_text">
             <span>
               Welcome to Watch My Wallet! The free web application that is designed to be your favourite budgeting tool for grocery shopping.
               Watch My Wallet was designed for people who need a shopping list application that is capable of recording product costs, compare 
               and monitor product prices.
             </span>
             <br /><br />
             <span>
               Watch My Wallet was inspired by the idea of merging a shopping list and budgeting application together. This allows its users to
               keep track of their shopping lists, grocery expenses, and allows them to compare and monitor the prices of their favourite products.
             </span>
             <br /><br />
             <span>             
                Sign up to start using Watch My Wallet!
             </span> 
            </Col>
          </Col>
          <Col xxl={3} id="centre_me">
          <Card id="about_us_card">
           <Card.Img src={img2} id='about_us_image' alt="Card image" />
           <Card.ImgOverlay className='image_overlay' id="image_overlay_about_us">
             {/* Image Source */}      
             <OverlayTrigger
               trigger="click"
               key="bottom"
               placement="bottom"
               overlay={
                 <Popover id={`popover-positioned-bottom`}>
                   <Popover.Body>
                   <a href='https://www.freepik.com/vectors/about-page' target={"_blank"} rel="noreferrer">About page vector created by pikisuperstar - www.freepik.com</a>
                   </Popover.Body>
                 </Popover>
               }>
               <button className="image_source_button" id="img2_source">Image Source</button>
             </OverlayTrigger>
           </Card.ImgOverlay>
           </Card>
          </Col>
        </Row>          
      </Container>

      {/*Features*/}
      <div id="features_target"/>
      <Container fluid id="featues_container">
        <Row>
          <HomePageFeatures />
        </Row>
      </Container>

      {/*Sign Up Form is Seen if user is not signed in*/}
      {user ? (
         <></> 
      ):(
         <> 
          <div id="sign_up_target"/>
          <Container fluid id="sign_up_container">
           <Registration />
          </Container>
         </>
         )}
    </>
  )
}

export default LandingAndRegistration
