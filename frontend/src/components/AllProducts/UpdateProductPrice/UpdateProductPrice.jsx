import { useState, useRef } from 'react';
//Redux/Slice
import { useSelector } from 'react-redux';
//Toastify
import { toast } from 'react-toastify';
//Axios
import axios from 'axios';
//helpers
import { onSale } from '../../../helpers/helpers';
//CSS
import './UpdateProductPrice.css';
import { Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const UpdateProductPrice = ({productData, productNames}) => {

  //fething user data (profile) & setting up header
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  // setting up for useRef
  const updated_sale = useRef(null);
  const updated_price_per_unit = useRef(null);
  //set up for useState
  const [ updateResult , setUpdatedResult ] = useState(null);

  // formatting user input to JSON
  const formatData = (res) => { return JSON.stringify(res, null, 2); }  
  
  // add new price point to product
  const addNewPricePoint = async () => {
    const add_price ={    
      historical_prices: [{
        sale: updated_sale.current.value,
        price_per_unit: updated_price_per_unit.current.value
      }]
    }
    try{
      const res = await axios.put(`/api/all_products/${productData.barcode}/${productData.shop}`, add_price, config);
      const result = { data: res.data };
      setUpdatedResult(formatData(result));
      toast.success(`New Price Point added to ${productNames.official_name}`);
      console.log(result);    
    }
    catch(error){
      if(productData.barcode === undefined && productData.shop === undefined){
        toast.error('No Product Selected');
      }
      else{
      toast.error(error.response.data.message + ' Please try again.');
      }
    }
  }

  //Submit Button
  const onSubmit = (e) => {
    e.preventDefault();
    addNewPricePoint();
  }

  return (
          <>
            {/* Title - Update Price */}
            <section>
              <Col>
                <h1 className='viewing_items_title'> Add New Price Point <FontAwesomeIcon icon={faChartLine} className="icon_orange"/></h1>
                <h3 className='capatilise_underline'> {productNames.official_name} </h3>
              </Col>  
            </section>
            {/* Registration Form Body */}
            <section>
              <form onSubmit={onSubmit}>

                {/* price per unit */}
                <Col>      
                  <span className='moving_input_titles'> Price Per Unit </span>
                  <input type='number' step={0.01} ref={updated_price_per_unit} placeholder='€€€€' className="form-control"/>
                </Col>

                {/* sale */}
                <Col className='space_between_inputs'>
                  <Form.Group>
                    <Form.Label id='sale_remove_margin'><span className='moving_input_titles'> Sale </span></Form.Label>
                    <Form.Select ref={updated_sale} id='sale_list_choices' className="form-control">
                      {onSale.map((sales, index) => {
                        return(
                        <option key={index}>
                          {sales.status}
                        </option>                    
                        )})}
                    </Form.Select>
                  </Form.Group>
                </Col>
                {/* submit button */}
                <Col className='space_between_inputs' id='add_price_button_position'>
                  <button type='submit' className='white_bg_submit' id='add_price_button'> Add Price </button>
                </Col>
              </form>
            </section>
    </>
  )
}

export default UpdateProductPrice
