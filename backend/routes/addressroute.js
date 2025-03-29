import express from "express";
import { addAddress, getAddress } from "../controllers-tmp/address.con.js";
import { Authenticated } from "../middlewares/auth.js";

const router = express.Router();

// add address
router.post("/add", Authenticated, addAddress);

// get address
router.get('/get',Authenticated, getAddress)

export default router;
