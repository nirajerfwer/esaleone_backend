import { Request, Response } from "express";
import { createProduct, getProduct, getProductById, updateProductQantity } from "../handlers/product_handler";

const express = require("express");
const Prouter = express.Router();
const multer = require("multer");
const mymulter = multer();

Prouter.post("", mymulter.none(), async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const product = await createProduct(req.body);
    res.status(200).send({ message: "prouct ed created", data: product });
  } catch (err) {
    console.log("error while ");
    res.status(500).send({ message: "error while creating product" });
  }
});

Prouter.get("",async (req: Request, res: Response) => {
    try{
        const products = await getProduct();
        if(products){

            res.status(200).send({message:"data found successfully",data:products});
        }else{
            res.status(200).send({message:"NO product found"});
        }
    }catch(err){
        res.status(500).send({message:"error while getting product data"});
    }
});
Prouter.get("/:id",async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const products = await getProductById(id);
        if(products){

            res.status(200).send({message:"data found successfully",data:products});
        }else{
            res.status(200).send({message:"NO product found"});
        }
    }catch(err){
        res.status(500).send({message:"error while getting product data"});
    }
});

// Prouter.patch("/:id",mymulter.none(),async (req: Request, res: Response) => {
//     try{
//         const id = req.params.id;
//         console.log("req.body",req.body);
//         const products = await updateProductQantity(id,req.body);
//         if(products){
//             res.status(200).send({message:"product quantity updated successfully",data:products});
//         }else{
//             res.status(200).send({message:"NO product found"});
//         }
//     }catch(err){
//         console.log("err",err);
//         res.status(500).send({message:`${err}`});
//     }
// });

export default Prouter;
