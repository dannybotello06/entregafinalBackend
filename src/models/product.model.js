

import mongoose from "mongoose"
import paginate from "mongoose-paginate-v2";

const productSchema= new mongoose.Schema({

    ids: String,
    title: String,
    description: String,
    code: String,
    stock: Number,
    price:Number,
    status: Boolean,
    category: String,
    thumbnail: String
  });

  productSchema.plugin(paginate);


    const Product = mongoose.model("Product",productSchema);


    export default Product;
