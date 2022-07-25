//Components
import Registration from "../components/Authentication/Registration"
//Redux/Slice
import { useSelector } from 'react-redux';
//CSS
import './pages_css/Landing_and_Registration.css'
import { Container, Col, Row, Card } from "react-bootstrap";
//Images
import img1 from "../images/img1.jpg";

function Landing_and_Registration() {

const { user } = useSelector((state) => state.auth);

  return (
    <>
    
        {/* IF USER IS LOGGED IN*/}

        {user ? (
           <>
           logged
           </>  
            ):(
             <> 
              <Registration />
             </>
            )
        }
 

      {/*Structure of the page*/}

      <Card className="bg-dark text-white">
      <Card.Img src={img1} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text>
      </Card.ImgOverlay>
    </Card>
 
    </>
  )
}

export default Landing_and_Registration