import { Payment } from "../models/payments.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'
import crypto from "crypto";

dotenv.config()

const razorpay = new Razorpay({
  //  key_id: process.env.RAZORPAY_KEY_ID,
  //  key_secret: process.env.RAZORPAY_KEY_SECRET,
    key_id: "rzp_test_5zZ84PgUMdnQ6Z",
   key_secret: "zUSptcdxysh3QXFp9PYCJe6P",
}); 

// checkout
export const checkout = async (req, res) => {
  try {
    const { amount, cartItems, userShipping, userId } = req.body;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Checkout failed", error });
  }
};

// verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  try {
    const body = orderId + "|" + paymentId;

    const expectedSignature = crypto
      .createHmac("sha256", "zUSptcdxysh3QXFp9PYCJe6P" )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const orderConfirm = await Payment.create({
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
      payStatus: "paid",
    });

    res.json({ message: "verified successful.", success: true, orderConfirm });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

// user specificorder
export const userOrder = async (req,res) =>{
  let userId = req.user._id.toString();
  // console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate :-1});
  res.json(orders)
}

// user specificorder
export const allOrders = async (req,res) =>{
 
  let orders = await Payment.find().sort({ orderDate :-1});
  res.json(orders)
}