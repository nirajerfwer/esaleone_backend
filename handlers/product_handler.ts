import product_model from "../db/product_model";

export const createProduct = async (bodydata: any) => {
  try {
    console.log("in apis call ");
    let product = {
      images: JSON.parse(bodydata.image),
      title: bodydata.title,
      description: bodydata.description,
      price: bodydata.price,
      colors: JSON.parse(bodydata.color),
      sizes: JSON.parse(bodydata.size),
      quantitys: parseInt(bodydata.quantity),
    };
    console.log("product data",product);
    let productmodel = new product_model(product);
    let createdProduct = await productmodel.save();
    return createdProduct;
  } catch (err) {
    console.log(err);
    throw new Error(`Validation failed: ${err}`);
  }
};

export const getProduct = ()=>{
    try{
        const productlist = product_model.find();
        return productlist;
    }catch(err){
        throw new Error(`${err}`);
    }
}

export const getProductById = (id:any)=>{
    try{
        const product = product_model.findById(id);
        return product;
    }catch(err){
        throw new Error(`${err}`);
    }
}
export const updateProductQantity = async (id:any,quantity:number)=>{
    try{
      let product = await product_model.findById(id).select("quantitys");
      console.log("product",product);
      console.log("quantity",quantity);
      let currentquantity = 0;
      if(product != null){
         currentquantity = (product?.quantitys - quantity);
      }
      if(!(currentquantity < 0)){
        const productupdated = product_model.findByIdAndUpdate(id,{$set:{quantitys:currentquantity}},{ new: true });
        return productupdated;
      }else{
       throw new Error("Not Enough Quantity");
      }
    }catch(err){
        throw new Error(`${err}`);
    }
}
