import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductsByIds,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/allProducts", getAllProducts);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.post("/getProductsByIds", getProductsByIds);

export default productRouter;
