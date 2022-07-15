import { useEffect } from "react";
//Router Dom
import { Link, useNavigate } from "react-router-dom";
//Slice/Reducx
import { deleteReceiptList, getSingleReceiptList } from "../../../features/receipt_lists/receipt_listSlice";
import { useDispatch, useSelector } from "react-redux";
//Component 
import Spinner from "../../Spinner/Spinner";
//CSS
import { Container, Row, Col } from "react-bootstrap";

const AllReceiptLists = () => {
  //Initialising dispatch & navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the receipt lists state from the redux store
  const {receipt_lists, isLoading_rl, isError_rl, message_rl} = useSelector((state) => state.receipt_lists);

  useEffect(() => {
if (isError_rl) {
  console.log(message_rl);
}
}, [receipt_lists]);

  if (isLoading_rl) {
    return <Spinner />;
  }

  return (
    <>
     <Col>
       {receipt_lists.map((receipt_list) => {
         return (
           <Col key={receipt_list._id}>
             {receipt_list.list_name} ||
             <button onClick={() => {dispatch(deleteReceiptList(receipt_list._id))}}> X </button> || 

             {/* <Link to={{pathname:`/receipt_lists/${receipt_list._id}`}}> View {receipt_list.title}</Link>*/}
             
             <Link to={{pathname:`/receipt_lists/${receipt_list._id}`}}> 
               <button onClick={() => dispatch(getSingleReceiptList(receipt_list._id))}> Go to {receipt_list.list_name} </button> 
              </Link>
           </Col>
         )
       })}        
     </Col> 
    </>
  )
}

export default AllReceiptLists