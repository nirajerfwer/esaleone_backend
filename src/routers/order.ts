import { Request, Response } from "express";
import { GetOrderyDetailsById } from "../handlers/checkout_handler";


const express = require("express");
const Orouter = express.Router();
const multer = require("multer");
const mymulter = multer();

Orouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const orderid = req.params.id;
    const Orders = await GetOrderyDetailsById(orderid);
    if (Orders) {
      res
        .status(200)
        .send({ message: "data found successfully", data: Orders });
    } else {
      res.status(200).send({ message: "NO order found" });
    }
  } catch (err) {
    console.log("erro",err);
    res.status(500).send({ message: "error while getting order data" });
  }
});

export default Orouter;
