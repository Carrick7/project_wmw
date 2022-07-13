import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { Test } from "./Test";
import { getSingleShoppingLists, reset } from '../../../features/shopping_lists/shopping_listSlice';
  function UpdateShoppingList() {  
  // initializing the dispatch function
  const dispatch = useDispatch();
  // Get the shopping list states from the redux store
  const {shopping_lists} = useSelector((state) => state.shopping_lists);

    return (
      <Container>
        <Row>
          <Col>
          {/* Goin through every shopping list*/}
          {shopping_lists.map((shopping_list) => {
              return (
                <Col key={shopping_list._id}>
                  {shopping_list.title} -- 
                  <Link to={`/shopping_lists/${shopping_list._id}`}>
                    <button onClick={() => dispatch(getSingleShoppingLists(shopping_list._id))}> Edit {shopping_list.title}</button>
                  </Link>
                  {shopping_list._id}
                  <br />
                  {/* Goin through all products in 1 list*/}
                  {shopping_list.product_info.map((products) => {
                    return (
                      <Col key={products._id}>
                        Name: {products.product_name} ||
                        Quantity: {products.quantity}
                        <br />
                      </Col>
                    );
                  })}
                  <hr />         
                </Col>
              )
            })} 
            
          </Col>
        </Row>
      </Container>
    )
  }
  
  export default UpdateShoppingList