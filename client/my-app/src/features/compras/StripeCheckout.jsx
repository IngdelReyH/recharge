import React, { useEffect, useState, useContext } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { NavLink } from 'react-router-dom';
import { Button, Form, Grid, Container } from "semantic-ui-react";
import { RootStoreContext } from '../../app/stores/rootStore';

export default function CheckoutForm() {
  const rootStore = useContext(RootStoreContext);
    const {recargaPrice,recargaName,backToRecargas} = rootStore.recargasStore;
    const {registerC} = rootStore.comprasStore;
    var precio = recargaPrice*100;
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          console.log("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          console.log("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          console.log("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          console.log("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    registerC();
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/paymentcompletion",
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    

  };

  return (
    <Grid>
      <Grid.Column width={10}>
      <Form id="payment-form" onSubmit={handleSubmit}>
     
      <img 
        width={300}
        src="https://png.pngitem.com/pimgs/s/122-1227024_transparent-background-3d-money-hd-png-download.png" 
        alt="Cant show image" 
        classname="img-fluid"/>
        <h2>{recargaName}</h2>
        <h3 className="text-center my-2">Price: ${recargaPrice}</h3>
        <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        />

        <div className="form-group">
          <Container>
          <PaymentElement id="payment-element" />
          </Container>
        </div>
     
      <Button.Group widths={2}>
      <Button  color='blue' 
      disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      <Button as={NavLink} to='/recargas' color='grey' content='cancel'/>
      </Button.Group>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </Form>
      </Grid.Column>  
    </Grid>
    
  );
}