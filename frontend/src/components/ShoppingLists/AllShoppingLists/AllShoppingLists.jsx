import { useEffect } from "react";
//Router Dom
import { Link } from "react-router-dom";
//Slice/Reducx
import { deleteShoppingList, getAllShoppingLists } from "../../../features/shopping_lists/shopping_listSlice";
import { reset_c } from '../../../features/counter/counterSlice';
import { useDispatch, useSelector } from "react-redux";
//CSS
import { Row, Col } from "react-bootstrap";
import './AllShoppingLists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
       <Row className="all_sLists">
         {shopping_lists.map((shopping_list) => {
           return (
             <Col key={shopping_list._id} xxl={4}>
              <Col className="main_col">
                <Row className="all_lists_row">
                  {/* bar for list */}
                  <Col xs={10} className='bar_for_each_list'>
                   <Link className="list_name" to={{pathname:`/shopping_lists/${shopping_list._id}`}}> 
                      <button className="navigate_to_list">{shopping_list.title}</button>
                    </Link>
                  </Col>
                  {/* delete button */}
                  <Col xs={2} className='bar_for_each_list'>
                  <button className='delete_button_bin' onClick={() => dispatch(deleteShoppingList(shopping_list._id))}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </button>
                  </Col>
                </Row>
              </Col>
             </Col> 
            )
          })}        
        </Row>
      </>
    )
  }
  
  export default AllShoppingLists