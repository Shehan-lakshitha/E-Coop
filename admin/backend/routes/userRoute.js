import express from "express";
import { loginUser, registerUser,getAllUsers, getUserById} from "../controllers/userController.js";
import { authenticateRole } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/allUsers", authenticateRole, getAllUsers);
userRouter.get("/getUser/:id", authenticateRole, getUserById);

export default userRouter;
