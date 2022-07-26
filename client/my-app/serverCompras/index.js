const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()

const stripe = new Stripe("sk_test_51L8tdbF8u5F5tGxozHjy6QAPRFDbDDqbiDFp3x6n469km8SkN0vHYGSTZY8x998QDCwiMWIo5ZqzvUmuaP4oQutz00hnkWAlez")

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout',async (req,res) =>{
    console.log("received",req.body);
    try {
        const { id, amount } = req.body
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Recarga usd",
        payment_method: id,
        confirm: true
    })
    console.log(payment)
    res.send({message: 'Successful payment'})
    } catch (error) {
        console.log(error);
        res.json({message: error.raw.message})
    }
})
app.listen(3001,() => {
    console.log('Server on port',3001)
})