//import { RootStoreContext } from '../../app/stores/rootStore';
const express = require("express");
const cors = require('cors');
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51L8tdbF8u5F5tGxozHjy6QAPRFDbDDqbiDFp3x6n469km8SkN0vHYGSTZY8x998QDCwiMWIo5ZqzvUmuaP4oQutz00hnkWAlez');

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.static("public"));
app.use(express.json());



const calculateOrderAmount = (amount) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return amount*100;
};

app.post('/api/checkout',async (req,res) =>{//app.post("/create-payment-intent", async (req, res) => {
  const { items, amount } = req.body;
  console.log("se debe mostrar req.body:",req.body);
  console.log("se debe mostrar items:",items);
  console.log("se debe mostrar amount:",amount);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(amount),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    message: 'Successful payment',
   clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3001, () => console.log("Node server listening on port 3001!"));