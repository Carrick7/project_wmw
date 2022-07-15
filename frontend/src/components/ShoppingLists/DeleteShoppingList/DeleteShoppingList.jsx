import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteShoppingList } from "../../../features/shopping_lists/shopping_listSlice";

  function RemoveShoppingList() {  
  // initializing the dispatch function
  const dispatch = useDispatch();
  // Get the shopping list states from the redux store
  const {shopping_lists} = useSelector((state) => state.shopping_lists);

    return (
      <Container>
          <Container>
            <Row>
              {/* Side Bar */}
              <Col sm={5}>
                {shopping_lists.map((shopping_list) => {
                  return (
                    <Col key={shopping_list._id} sm={1}>
                      {shopping_list.title} 
                      <button onClick={() => dispatch(deleteShoppingList(shopping_list._id))}> X </button>
                      <Link to={{pathname:`/shopping_lists/${shopping_list._id}`}}> View {shopping_list.title}</Link>
                    </Col>
                  )
                })}       
                {/* Single List */}
                <Col sm={5}>
                </Col>   
              </Col>
            </Row>
          </Container>
          

      </Container>
    )
  }
  
  export default RemoveShoppingList