import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./StripeCheckout";
import { RootStoreContext } from '../../app/stores/rootStore';

//import "./StripeApp.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51L8tdbF8u5F5tGxo07nuHlc4vxtqLDjwNXcdd7Fozhgf530X7ai67sCljKe4MRnLYQ3xX2vBlv6m0rg1DVoouR6M0097vs9Y5e");

export default function StripeApp() {
  const [clientSecret, setClientSecret] = useState("");
  const rootStore = useContext(RootStoreContext);
  const {recargaPrice} = rootStore.recargasStore;
  var precio = recargaPrice;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    //const {id} =paymentMethod;
    fetch('http://localhost:3001/api/checkout', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt"}],amount:precio }),
    })
      .then((res) => res.json())
      .then((data) =>  (console.log(data), setClientSecret(data.clientSecret)));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="StripeApp">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}