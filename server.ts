import { Request, Response } from "express";
import mongoose from "mongoose";
import Prouter from "./routers/product_router";
import Crouter from "./routers/checkout_router";
import { sendConfirmationEmail } from "./handlers/mailtrap_handler";
import Orouter from "./routers/order";
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

async function dbconnection() {
  await mongoose.connect(
    "mongodb+srv://nirajv217:bqTKP0BR55z89Xgy@cluster0.2xdgucy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {}
  );
}

dbconnection()
  .then((data) => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("erro",err);
    console.log("erro while connecting db");
  });
app.use("/product", Prouter);
app.use("/checkout", Crouter);
app.use("/order", Orouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
