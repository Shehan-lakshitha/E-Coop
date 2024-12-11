import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";
import productRouter from "./routes/productRoute.js";

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

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});