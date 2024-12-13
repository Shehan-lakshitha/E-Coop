import express from "express";
import { placeOrder, verifyOrder, getOrders, getUserOrders, statusUpdate } from "../controllers/orderController.js";
import { authenticateRole, authenticateUser } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/placeOrder", authenticateUser, placeOrder);
orderRouter.post("/verifyOrder", authenticateUser, verifyOrder);
orderRouter.get("/getOrders", authenticateRole, getOrders);
orderRouter.get("/getUserOrders", authenticateUser, getUserOrders);
orderRouter.post("/statusUpdate", authenticateRole, statusUpdate);

export default orderRouter;