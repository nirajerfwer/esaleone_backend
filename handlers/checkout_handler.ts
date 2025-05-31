import bcrypt from "bcrypt";
import Checkout_model from "../db/Checkout_model";
import { OrderModel } from "../db/Order_Model";
import { sendApprovedMail } from "./mailtrap_handler";
import { updateProductQantity } from "./product_handler";

export const AddCheckOutAndOrderDetials = async (bodydata: any) => {
  try {
    console.log("bodydat", bodydata);
    let cvvhash = await bcrypt.hash(bodydata.cvvHash, 10);
    let products = JSON.parse(bodydata.products);
    let totalprice = bodydata.totalprice;
    let subtotal = bodydata.subtotal;
    let tax = bodydata.tax;

    let checkoutdata = {
      fullName: bodydata.fullName,
      email: bodydata.email,
      phoneNumber: bodydata.phoneNumber,
      address: bodydata.address,
      city: bodydata.city,
      state: bodydata.state,
      zipCode: bodydata.zipCode,
      card: bodydata.card,
      cardExpiry: convertExpiryToDate(bodydata.cardExpiry),
      cvvHash: cvvhash,
    };
    let checkoutmodel = new Checkout_model(checkoutdata);
    let createdCheckout = await checkoutmodel.save();

    console.log("products", products);

    const orderData = {
      Products: products,
      Totalprice: totalprice,
      SubTotal: subtotal,
      Tax:tax,
      CheckOutId: createdCheckout._id,
    };

    const orderModel = new OrderModel(orderData);
    let createdOrder = await orderModel.save();

   const quantityupdate = await updateProductQantity(products.ProductId,products.quantity);

    console.log("quantityUpdate",quantityupdate);
    return { checkout: createdCheckout, order: createdOrder };
  } catch (err) {
    console.log(err);
    throw new Error(`Error while Creating Order and CheckOut: ${err}`);
  }
};

function convertExpiryToDate(expiry: string): Date {
  const [monthStr, yearStr] = expiry.split("/");
  const month = parseInt(monthStr, 10);
  const year = 2000 + parseInt(yearStr, 10); // handle "26" as 2026
  return new Date(year, month); // JS months are 0-based
}

export const GetCheckOutDetials = async () => {
  try {
    const checkoutlist = await Checkout_model.find();
    return checkoutlist;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const GetOrderyDetailsById = async (id:any)=>{
     const orderdata = await OrderModel.findById(id).populate("CheckOutId").exec();
     if(orderdata){

       return orderdata;
     }else{
        console.log("no order found");
        return ;
     }
}
