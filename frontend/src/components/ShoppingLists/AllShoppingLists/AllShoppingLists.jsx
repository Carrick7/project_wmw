import { useEffect } from "react";
//Router Dom
import { Link } from "react-router-dom";
//Slice/Reducx
import { deleteShoppingList } from "../../../features/shopping_lists/shopping_listSlice";
import { useDispatch, useSelector } from "react-redux";
//Component 

//CSS
import { Container, Row, Col } from "react-bootstrap";

  function AllShoppingLists() {  
  // initializing the dispatch function
  const dispatch = useDispatch();

  // Get the shopping lists state from the redux store
  const {shopping_lists} = useSelector((state) => state.shopping_lists);
    
    return (
      <>
       <Col>
         {shopping_lists.map((shopping_list) => {
           return (
             <Col key={shopping_list._id}>
               {shopping_list.title} ||
               <button onClick={() => dispatch(deleteShoppingList(shopping_list._id))}> X </button> ||
               <Link to={{pathname:`/shopping_lists/${shopping_list._id}`}}> View {shopping_list.title}</Link>
             </Col>
           )
         })}        
       </Col>  
      </>
    )
  }
  
  export default AllShoppingLists