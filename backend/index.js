import express from "express";
import cors from "cors";

//congiguration
const app = express();
const port = 4000;

//middlewares
app.use(cors());
app.use(express.json());