import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteShoppingList } from "../../../features/shopping_lists/shopping_listSlice";

  function RemoveShoppingList() {  
  // initializing the dispatch function
  const dispatch = useDispatch();
  // Get the shopping list states from the redux store
  const {shopping_lists} = useSelector((state) => state.shopping_lists);

    return (
      <Container>
        <Row>
          <Col>
            {shopping_lists.map((shopping_list) => {
              return (
                <Col key={shopping_list._id}>
                  {shopping_list.title} 
                  <button onClick={() => dispatch(deleteShoppingList(shopping_list._id))}> X </button>
                </Col>
              )
            })}          
          </Col>
        </Row>
      </Container>
    )
  }
  
  export default RemoveShoppingList