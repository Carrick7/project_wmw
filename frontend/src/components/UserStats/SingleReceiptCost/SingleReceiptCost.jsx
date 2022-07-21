import { useEffect,useState } from "react"
//Router Dom
import { useLocation, useNavigate } from 'react-router-dom';
//Components
//Slices/Redux
import {  useSelector } from "react-redux";
//CSS
import { Container, Row, Col } from 'react-bootstrap';
import './SingleReceiptCost.css';
import PriceDonutChart from "./PriceDonutChart";

const SingleReceiptCost = ({ receiptListData }) => {

  //Show JSX for Stats
  const [ showStats, setShowStats ] = useState(false);
  const [ finalCost, setFinalCost ] = useState(0);
  const [roundedPercentage, setRoundedPercentage] = useState([]);

  //setting up the total cost arrays for pricing
  const costStringArray = [];
  const costNumberArray = [];
  const costPercentArray = [];
  //setting up the total cost arrays for product names
  const productNameArray = [];
  const roundedArray = [];

  const convertSumPercent = () => {
    //Ensuring that the function is only executed when the receiptListData is loaded
    if(showStats){
      //Converting the string array to a number array
      costStringArray.forEach(string => {
        costNumberArray.push(parseFloat(string));
      });
      //Adding the numbers in the number array
      const total = costNumberArray.reduce((result, number) => result + number);
      setFinalCost(total.toFixed(2));
    
    //converting to % of total cost
    costPercentArray.forEach(string => {
      roundedArray.push(parseFloat(string).toFixed(2));
    });
    setRoundedPercentage(roundedArray)}
  } 

  //useEffect 
  useEffect(() => {
    convertSumPercent();
  }, [finalCost, receiptListData]);

  return (
    <>
      <button onClick={() => {setShowStats(!showStats)}}> 
        {showStats ? `Hide ${receiptListData.list_name} Data`:`Show ${receiptListData.list_name} Data`}
      </button>
      {showStats ? 
        <Col> <Col><h1>{receiptListData.list_name} Statistics</h1></Col>
          {/* Mapping through each item */}
          <Col>{receiptListData.item_info.map((item) => {
            return(
              <Col key={item._id}>
                Name: {item.official_name} ||
                <Col type="number" className="hide_array_index">{productNameArray.push(`${item.official_name}`)}</Col>
                Quantity: {item.quantity} ||
                Price Per Unit: €{item.price_per_unit} ||
                Cost: €{item.price_per_unit*item.quantity}
                {/* Populating the CostStringArray with the total cost of each item as an array of strings */}  
                <Col type="number" className="hide_array_index">{costStringArray.push(`${item.price_per_unit*item.quantity}`)}</Col>
                {/* Populating the costPercentArray with the % cost of each item as an array of strings */}           
                <Col type="number" className="hide_array_index">{costPercentArray.push(`${((item.price_per_unit*item.quantity)/finalCost)*100}`)}</Col>           
              </Col>  
            )})}
          </Col>
          {/* End of Mapping */}
          <hr />
          {/* Total List Cost*/}
          <Col>Total Cost for {receiptListData.list_name}: €{finalCost}</Col>
          {/* DonutChart*/}
          <Col><PriceDonutChart costNumberArray={costNumberArray} finalCost={finalCost} productNameArray={productNameArray} roundedPercentage={roundedPercentage}/></Col>
        </Col>
      : null}
    </>
  )
}

export default SingleReceiptCost