import express from "express";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { authenticateRole, authenticateUser } from "../middleware/auth.js";

const categoryRouter = express.Router();

// categoryRouter.get('/',authenticateUser, getAllCategories);
// categoryRouter.post('/add',authenticateRole, addCategory);
// categoryRouter.delete('/delete/:id',authenticateRole, deleteCategory);
// categoryRouter.put('/update/:id',authenticateRole, updateCategory);

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/add", authenticateRole, addCategory);
categoryRouter.delete("/delete/:id", authenticateRole, deleteCategory);
categoryRouter.put("/update/:id", authenticateRole, updateCategory);

export default categoryRouter;
