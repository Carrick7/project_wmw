import { useEffect } from "react";
//Router Dom
import { Link } from "react-router-dom";
//Slice/Reducx
import { deleteReceiptList, getAllReceiptLists } from "../../../features/receipt_lists/receipt_listSlice";
import { useDispatch, useSelector } from "react-redux";
import { reset_c } from '../../../features/counter/counterSlice';
//Component 
import Spinner from "../../Spinner/Spinner";
//CSS
import { Container, Row, Col } from "react-bootstrap";

const AllReceiptLists = () => {
  //Initialising dispatch & navigate
  const dispatch = useDispatch();

  // Get the receipt lists state from the redux store
  const {receipt_lists } = useSelector((state) => state.receipt_lists);

  //get the state for the counter ***Redux was used to solve the infinite loop to dynamically show the addition/deletion of items for the list**
  const count = useSelector((state) => state.counter.value);
  
  useEffect(() => {
    dispatch(getAllReceiptLists());
    dispatch(reset_c());
  }, [ count ]);
  
  return (
    <>
     <Col>
       {receipt_lists.map((receipt_list) => {
         return (
           <Col key={receipt_list._id}>
             {receipt_list.list_name} ||
             <button onClick={() => {dispatch(deleteReceiptList(receipt_list._id))}}> X </button> || 
              <Link to={{pathname:`/receipt_lists/${receipt_list._id}`}}> View {receipt_list.title}</Link>
           </Col>
         )
       })}        
     </Col> 
    </>
  )
}

export default AllReceiptLists