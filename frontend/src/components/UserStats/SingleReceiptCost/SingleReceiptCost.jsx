import { useEffect,useState } from "react"
//Components
import PricePercentageDoughnutChart from "./DoughnutCharts/PricePercentageDoughnutChart";
//Slices/Redux
import { useDispatch } from "react-redux";
import { increment } from '../../../features/counter/counterSlice';
//CSS
import { Col, Row } from 'react-bootstrap';
import './SingleReceiptCost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPieChart } from '@fortawesome/free-solid-svg-icons';
//helpers
import { capitaliseMe } from "../../../helpers/helperFunctions";

const SingleReceiptCost = ({ receiptListData }) => {

  //initialise dispatch
  const dispatch = useDispatch();

  //Show JSX for Stats
  const [ showStats, setShowStats ] = useState(false);
  const [ finalCost, setFinalCost ] = useState(0);
  const [roundedPercentage, setRoundedPercentage] = useState([]);

  //setting up the total cost arrays for pricing and array for the product names. ALL EMPTY ARRAYS
  const costStringArray = [];
  const costNumberArray = [];
  const productNameArray = [];
  // empty arrays for calulating the percentage cost of each product
  const costPercentArray = [];
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
    if(receiptListData.item_info.length >= 1){
      convertSumPercent();
      dispatch(increment());
      setShowStats(true);
    }
    else{
      setShowStats(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalCost, receiptListData.item_info.length, showStats]);

  return (
          <>
            <h1 className='viewing_items_title'>
              Statistics 
              <span> <FontAwesomeIcon icon={faPieChart} className="icon_orange"/> </span>  
            </h1>
            <Col>{receiptListData.item_info.map((item) => {
              return(
                <Col key={item._id}>
                  <Col type="number" className="hide_array_index">{productNameArray.push(`${capitaliseMe(item.official_name)}`)}</Col>
                  {/* Populating the CostStringArray with the total cost of each item as an array of strings */}  
                  <Col type="number" className="hide_array_index">{costStringArray.push(`${item.price_per_unit*item.quantity}`)}</Col>
                  {/* Populating the costPercentArray with the % cost of each item as an array of strings */}           
                  <Col type="number" className="hide_array_index">{costPercentArray.push(`${((item.price_per_unit*item.quantity)/finalCost)*100}`)}</Col>           
                </Col>  
              )})}
            </Col>

            {/* DonutChart for percentage cost of each item*/}
            <Col>
              <Col id="margin_bottom_donut">
                <span className='make_bold'> 
                  The Dougnut Chart below represents the % of each product's cost
                  out of the total cost of <span className="capatilise_me"> {receiptListData.list_name} </span>
                </span>
              </Col>        
              {/* Total List Cost*/}
              <Row>
                <Col xxl={6} className='make_bold'>
                  Amount of Products: {costPercentArray.length}
                </Col>  
                <Col xxl={6} className='make_bold'>
                  Total Cost: €{finalCost}
                </Col>  
              </Row>
              {/* Doughnut Chart*/}
              <Col>
                <PricePercentageDoughnutChart 
                  finalCost={finalCost} 
                  productNameArray={productNameArray} 
                  roundedPercentage={roundedPercentage}/>
              </Col>
            </Col>
          </>
  )
}
export default SingleReceiptCost