import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/allProducts", getAllProducts);


export default productRouter;