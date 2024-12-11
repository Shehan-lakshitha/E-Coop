import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

//congiguration
const app = express();
const port = 4000;

//middlewares
app.use(cors());
app.use(express.json());

//connect to database
connectDB();

//routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
