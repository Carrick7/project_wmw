//CSS
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackingProductPrice from "../../UserStats/TrackingProductPrice/TrackingProductPrice";

const Product = ({OneProductData}) => {
  //getting the latest price 
const latestEntry = OneProductData.historical_prices[OneProductData.historical_prices.length - 1];

  return (
    <>
    <hr/>
      <h3>{OneProductData.product_names[0].official_name} Basic Info</h3>
      <Col>Official Name: {OneProductData.product_names[0].official_name}</Col>    
      <Col>Generic Name: {OneProductData.product_names[0].generic_name}</Col>      
      <Col>Shop Name: {OneProductData.shop}</Col>
      <Col>Category: {OneProductData.category}</Col>
      <Col>Barcode: {OneProductData.barcode}</Col>
      <h3>Price Info</h3>
      <Col>Latest Price Value: €{latestEntry.price_per_unit}</Col>
      <Col>Date Recorded: {latestEntry.createdAt}</Col>
      <Col>Sale: {latestEntry.sale}</Col>
      
      <Row>
        <Col>
         <TrackingProductPrice prices={OneProductData.historical_prices}/>
        </Col>
      </Row>
    </>
  )
}

export default Product