import Registration from "../components/Authentication/Registration"
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import TrackingProductPrice from "../components/UserStats/TrackingProductPrice/TrackingProductPrice";
function Landing_and_Registration() {

const { user } = useSelector((state) => state.auth);

  return (
    <Container>
      <Row>
        <Col>
        {user ? (
           <Col>
            You are logged in. This is the home page.
           </Col>  
            ):(
             <> 
              <Registration />
             </>
            )
        }


         
        </Col>
      </Row>
    </Container>
  )
}

export default Landing_and_Registration