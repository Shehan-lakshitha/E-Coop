import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductsByIds,
} from "../controllers/productController.js";
import { authenticateRole } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.post("/add",authenticateRole, addProduct);
productRouter.get("/allProducts", getAllProducts);
productRouter.delete("/delete/:id", authenticateRole, deleteProduct);
productRouter.put("/update/:id", authenticateRole, updateProduct);
productRouter.get("/getProductsByIds", getProductsByIds);

export default productRouter;
