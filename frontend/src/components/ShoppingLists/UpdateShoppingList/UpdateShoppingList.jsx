import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


  function UpdateShoppingList() {  

  // Get the shopping list states from the redux store
  const {shopping_lists} = useSelector((state) => state.shopping_lists);

  // initializing the dispatch function
  const dispatch = useDispatch();

    return (
      <Container>
        <Row>
          <Col>
            UPDATE LIST      
          </Col>
        </Row>
      </Container>
    )
  }
  
  export default UpdateShoppingList