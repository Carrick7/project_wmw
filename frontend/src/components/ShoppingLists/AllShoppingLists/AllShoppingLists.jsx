import { useEffect } from "react";
//Router Dom
import { Link } from "react-router-dom";
//Slice/Reducx
import { deleteShoppingList, getAllShoppingLists } from "../../../features/shopping_lists/shopping_listSlice";
import { reset_c } from '../../../features/counter/counterSlice';
import { useDispatch, useSelector } from "react-redux";
//componenets
import DateConverting from "../../DateConverting/DateConverting";
//CSS
import { Container, Row, Col, Card } from "react-bootstrap";
import './AllShoppingLists.css';

  function AllShoppingLists() {  
  // initializing the dispatch function
  const dispatch = useDispatch();

  // Get the shopping lists state from the redux store
  const { shopping_lists } = useSelector((state) => state.shopping_lists);

  //get the state for the counter ***Redux was used to solve the infinite loop to dynamically show the addition/deletion of items for the list**
  const count = useSelector((state) => state.counter.value);

  useEffect(() => {
    dispatch(getAllShoppingLists());
    dispatch(reset_c());
  }, [ count ]);

    return (
      <>
       <Row>
         {shopping_lists.map((shopping_list) => {
           return (
             <Col key={shopping_list._id} md={4}>
                <Card className='card_shopping_list'>
                  <Card.Header>
                    <Row>
                     <Col> {shopping_list.title} </Col>
                     <Col><button onClick={() => dispatch(deleteShoppingList(shopping_list._id))}> X </button></Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Created on <DateConverting date={shopping_list.createdAt} />
                    </Card.Text>
                    <Link to={{pathname:`/shopping_lists/${shopping_list._id}`}}> Edit {shopping_list.title}</Link>
                  </Card.Body>
                </Card>
             </Col> 
           )
         })}        
     </Row>
      </>
    )
  }
  
  export default AllShoppingLists