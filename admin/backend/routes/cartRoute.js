import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import { authenticateUser } from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authenticateUser, addToCart);
cartRouter.delete("/remove", authenticateUser, removeFromCart);
cartRouter.get("/getCart", authenticateUser, getCart);

export default cartRouter;
