

import mongoose from "mongoose"


const cartSchema= new mongoose.Schema({

    id: {type: String},
    products: [{ id: String, quantity: Number }],

  });

    const Cart = mongoose.model("Cart",cartSchema);


    export default Cart;
