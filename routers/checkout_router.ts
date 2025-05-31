import { Request, Response } from "express";
import {
  AddCheckOutAndOrderDetials,
  GetCheckOutDetials,
} from "../handlers/checkout_handler";
import { handlerEmails } from "../handlers/email_handler";

const express = require("express");
const Crouter = express.Router();
const multer = require("multer");
const mymulter = multer();

Crouter.post("", mymulter.none(), async (req: Request, res: Response) => {
  try {
    const checkout = await AddCheckOutAndOrderDetials(req.body);
    res.status(200).send({ message: "checkout created", data: checkout });

    handlerEmails(checkout);
    
  } catch (err) {
    console.log("error while", err);
    res
      .status(500)
      .send({ message: "error while creating checkout", err: `${err}` });
  }
});

Crouter.get("", async (req: Request, res: Response) => {
  try {
    const Checkouts = await GetCheckOutDetials();
    if (Checkouts) {
      res
        .status(200)
        .send({ message: "data found successfully", data: Checkouts });
    } else {
      res.status(200).send({ message: "NO checkout found" });
    }
  } catch (err) {
    res.status(500).send({ message: "error while getting checkout data" });
  }
});

export default Crouter;
