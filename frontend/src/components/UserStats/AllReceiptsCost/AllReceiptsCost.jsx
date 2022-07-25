import { useState } from "react";
//Redux/Slice
import { useSelector } from "react-redux";
//CSS
import { Container, Row, Col } from 'react-bootstrap';
import './AllReceiptsCost.css';

const AllReceiptsCost = () => {
  //show button content 
  const [showMe, setShowMe] = useState(false);

  //empty array
  const costArray = [];

  // Get the receipt lists state from the redux store
  const { receipt_lists } = useSelector((state) => state.receipt_lists);
  // receipt_lists[0].list_nasmded;
  
  return (
    <>
      <h1>Test</h1>
      <button onClick={() => setShowMe(!showMe)}>{showMe ? 'Hide' : 'Show'}</button>
      {showMe ? 
        <Col>
          {receipt_lists.map((receipt_list) => {
            return (
              <Col key={receipt_list._id}>
                <hr />
                {receipt_list.list_name}
                <Col>
                  {receipt_list.item_info.map((item) => {
                    return (
                      <Col key={item._id}>
                        Name: {item.official_name} ||
                        Quantity: {item.quantity} ||
                        Price Per Unit: {item.price_per_unit} ||
                        Total Cost: {costArray.push(`${item.price_per_unit*item.quantity}`)}
                        {item.price_per_unit*item.quantity} ||
                      </Col>
                    )
                  })}
                </Col>
              </Col>
            )
          })}
        </Col> 
      : null}
    </>
  )
}

export default AllReceiptsCost