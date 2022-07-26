import React, { useState,useContext } from 'react'
import {loadStripe} from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button, Form, Container } from 'semantic-ui-react';
import  axios from 'axios';
import { RootStoreContext } from '../../app/stores/rootStore';
//import "bootswatch/dist/lux/bootstrap.min.css";


const stripePromise = loadStripe("pk_test_51L8tdbF8u5F5tGxo07nuHlc4vxtqLDjwNXcdd7Fozhgf530X7ai67sCljKe4MRnLYQ3xX2vBlv6m0rg1DVoouR6M0097vs9Y5e")
const CheckoutForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {recargaPrice,recargaName,backToRecargas} = rootStore.recargasStore;
    var precio = recargaPrice*100;
    
     const stripe = useStripe();
    const elements= useElements();

    const[loading,setLoading]=useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();

       const {error,paymentMethod} =  await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });
        setLoading(true)

        if(!error){
            //console.log(paymentMethod)
            const {id} =paymentMethod;
            try{
            const{data} = await axios.post('http://localhost:3001/api/checkout', {id, amount:precio})
            
            console.log(data);

            elements.getElement(CardElement).clear();
        }catch(error)
        {
            console.log(error);
        }

        setLoading(false)
        }
    }
    
    return <Form onSubmit={handleSubmit} className="card card-body">
        <img 
        src="https://png.pngitem.com/pimgs/s/122-1227024_transparent-background-3d-money-hd-png-download.png" 
        alt="Cant show image" 
        classname="img-fluid"/>
        <h2>{recargaName}</h2>
        <h3 className="text-center my-2">Price: ${recargaPrice}</h3>
        <div className="form-group">
            <Container>
            <CardElement className="form-control"/>
            </Container>
       
        </div>
        
        <Button 
        disabled={!stripe}
        positive>
            {loading ? (<div className="spinner-border text-light" role={"status"}>
                <span className='sr-only'>
                Loading...
                </span>
            </div>): "Buy"}
        </Button>
        <Button 
             onClick={backToRecargas}
            floated='right' 
            color='grey' 
            content='Cancel'
            />
    </Form>
}

const Shopping = () => {

   
  return (
  <Elements stripe={stripePromise}>
    <div className="container p-4">
        <div className="row">
            <div classname="col-md-4 offset-md-4">
            <CheckoutForm/>
            </div>
        </div>
    </div>
  </Elements> 
  

  )
}

 
export default Shopping
