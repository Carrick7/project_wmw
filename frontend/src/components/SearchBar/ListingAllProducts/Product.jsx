//Components
import TrackingProductPrice from "../../UserStats/TrackingProductPrice/TrackingProductPrice";
import DateConverting from "../../DateConverting/DateConverting";
//CSS
import { Row, Col } from "react-bootstrap";
import './ListingAllProducts.css';

const Product = ({OneProductData}) => {
  //getting the latest price 
const latestEntry = OneProductData.historical_prices[OneProductData.historical_prices.length - 1];

  return (
      <Row className="products_row" >
        <Col xxl={4} className='size_me'>
          <h2 className='products_page_item_title'>
            {OneProductData.product_names[0].official_name}
          </h2>  
          <Col className='cap_me'>Generic Name: {OneProductData.product_names[0].generic_name}</Col>      
          <Col className='cap_me'>Shop Name: {OneProductData.shop}</Col>
          <Col className='cap_me'>Category: {OneProductData.category}</Col>
          <Col className='cap_me'>Barcode: {OneProductData.barcode}</Col>
          <Col className='cap_me'>Latest Price Value: €{latestEntry.price_per_unit}</Col>
          <Col className='cap_me'>Sale: {latestEntry.sale}</Col>
          <Col className='cap_me'>Date Recorded: <DateConverting date={latestEntry.createdAt}/></Col>
          <br /><br />        
        </Col>
        <Col xxl={8} className='size_me2'>
         <TrackingProductPrice prices={OneProductData.historical_prices}/>        
        </Col>
        <hr />
      </Row>
  )
}

export default Product