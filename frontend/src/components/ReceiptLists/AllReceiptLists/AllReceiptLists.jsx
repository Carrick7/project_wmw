import { useEffect } from "react";
//Router Dom
import { Link } from "react-router-dom";
//Slice/Reducx
import { deleteReceiptList, getAllReceiptLists } from "../../../features/receipt_lists/receipt_listSlice";
import { useDispatch, useSelector } from "react-redux";
//Component 
import Spinner from "../../Spinner/Spinner";
//CSS
import { Container, Row, Col } from "react-bootstrap";
//Toast Errors
import { toast } from 'react-toastify';

const AllReceiptLists = () => {
  //Initialising dispatch & navigate
  const dispatch = useDispatch();

  // Get the receipt lists state from the redux store
  const {receipt_lists, isLoading_rl, isError_rl, message_rl} = useSelector((state) => state.receipt_lists);
  
  useEffect(() => {
    //send error and load spinner
    if(isError_rl) {
    toast.error(message_rl + ' Please try again.');
    }
    //send spinner
    if(isLoading_rl) {
      return <Spinner />;
    }
    // executing the getAllShoppingLists action
    dispatch(getAllReceiptLists());
  }, [ dispatch ]);
  
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