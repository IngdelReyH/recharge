import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form } from 'semantic-ui-react';



const stripePromise = loadStripe("pk_test_51L8tdbF8u5F5tGxo07nuHlc4vxtqLDjwNXcdd7Fozhgf530X7ai67sCljKe4MRnLYQ3xX2vBlv6m0rg1DVoouR6M0097vs9Y5e")


const Compras = () => {

   

    const handleSubmit =(e: Event)=>{
        e.preventDefault();

     /* const {error, paymentMethod} =   stripe.createPaymentMethod({
            type: 'card',
            card: useElements.getElement(CardElement)
        })*/

    }
  return (
   <Elements stripe={stripePromise}>
    <Form /*onSubmit={handleSubmit}*/>
    <CardElement/>
    <Button>
        Buy
    </Button>
    </Form>
   </Elements>
  )
}

export default Compras
