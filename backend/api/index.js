import express from 'express'
import bodyParser from 'express'
import userRouter from '../routes/userroute.js'
import productRouter from '../routes/productroute.js'
import cartRouter from '../routes/cartroute.js'
import addressRouter from '../routes/addressroute.js'
import paymentRouter from '../routes/paymentroute.js'
import cors from 'cors';
import connectdb from '../db/connectdb.js';
import serverless from "serverless-http";

const app = express();

app.use(bodyParser.json())

app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))

// home testing route
app.get('/',(req,res)=>res.json({messge:'This is home route'}))

// user Router
app.use('/api/user',userRouter)

// product Router
app.use('/api/product',productRouter)

// cart Router
app.use('/api/cart',cartRouter)

// address Router
app.use('/api/address',addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)

await connectdb();
// mongoose.connect(
//   process.env.mongo_url,{
//     dbName:"MERN_E_Commerce"
//   }
// ).then(()=>console.log("MongoDB Connected Succssfully...!")).catch((err)=>console.log(err));

const port = 1000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))

export default serverless(app);