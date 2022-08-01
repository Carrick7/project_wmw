import { useState, useEffect } from "react";
//Slices/Redux
import { useSelector } from "react-redux";
//CSS
import { Col } from 'react-bootstrap';
import './AllReceiptsCost.css';

const AllReceiptsCost = () => {

  const [ receiptCost, setReceiptCost ] = useState(0);
  // Get the receipt lists state from the redux store
  const { receipt_lists } = useSelector((state) => state.receipt_lists);
  //empty array
  const costStringArray = [];
  const costNumberArray = [];

  const showData = () => {
    if(costStringArray.length <= 0 ){
      setReceiptCost(0);
    }
    else if(costStringArray.length >= 1){
      //Converting the string array to a number array
      costStringArray.forEach(string => {
        costNumberArray.push(parseFloat(string));
      });
      //Adding the numbers in the number array
      const totalPerReceipt = costNumberArray.reduce((result, number) => result + number);
      setReceiptCost(totalPerReceipt.toFixed(2));
    }
  }

  //useEffect 
  useEffect(() => {
    showData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ receipt_lists ]);

  return (
        <> 
        <Col xl={4} className="totalCost">
           {receipt_lists.map((receipt_list) => {
             return (
               <Col key={receipt_list._id}>
                 <Col>
                   {receipt_list.item_info.map((item) => {
                     return (
                       <Col key={item._id}>
                           <Col type="number" className="hide_array_index">
                             {costStringArray.push(`${item.price_per_unit*item.quantity}`)}
                           </Col>
                       </Col>
                     )
                   })}
                 </Col>
               </Col>
             )
           })}
          <span> €{receiptCost} </span> 
         </Col>
        </>
  )
}

export default AllReceiptsCost