//CSS
import './Home_Page_Features.css'
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faReceipt, faChartLine } from '@fortawesome/free-solid-svg-icons';

const HomePageFeatures = () => {
  return (
    <>
      <h1 id='home_feature_title'> Features </h1>
      <Row id='row_features'>
        <Col md={4} className="feature_titles_and_text">
          <h2> Shopping List <FontAwesomeIcon icon={faBasketShopping}/></h2>
           <span> 
             Use Watch My Wallet as a shopping list. You can create, add and remove items from your shopping lists from 
             anywhere and anytime on any device. 
             <br /> <br /> 
             A stable internet connection is needed for this feature.
           </span>
        </Col>
        <Col md={4} className="feature_titles_and_text">
         <h2> Receipts <FontAwesomeIcon icon={faReceipt}/></h2>
          <span>
            Watch My Wallet can be used to track your grocery receipts. You can add all the products you bought from your shopping trip 
            to each receipt.
            <br /><br /> 
            This allows the application to calculate and save the total cost of each receipt. 
            The total precentage of each product is also calculated and displayed via a doughnut chart. 
          </span>
        </Col>
        <Col md={4} className="feature_titles_and_text">
         <h2> Products <FontAwesomeIcon icon={faChartLine}/></h2> 
          <span>
            Watch My Wallet allows its users to fetch any product's details from the database. Any product that is not registered can be uploaded to
            the database by a registered user.
            <br /><br />
            This allows the user to compare product prices and use the application as an inflation monitoring tool for any product. 
            </span> 
        </Col>
      </Row>
    </>
  )
}

export default HomePageFeatures