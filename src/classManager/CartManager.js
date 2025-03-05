import fs from "fs";
import Cart from "../models/cart.model.js";
class CartManager {
  

  getCartID = async (id) => {
    
      try {

        console.log(id);

        const cartquery=await Cart.findById(id).populate("products.product").lean(); 

        
        return cartquery;
   
      } catch (error) {
        throw new Error("Error consultando el carrito " + error.message);
      }
   
  };

  //addCart
  addCart = async () => {
  
    try {
     
      const reponse=await Cart.insertOne();
        
        
        return reponse;


    } catch (error) {
      throw new Error("Error creando el carrito " + error.message);
    }

  };

  //addProductById
  addCartProductID = async (idcart, id, quantity) => {
    try {

      

      const cartquery=await Cart.findByIdAndUpdate(idcart,

        {$push:{
          products:{product:id,quantity:quantity}}},
        {new:true}
      )
          return { message: "Producto Agregado para el carrito " + idcart};
        
      
    } catch (error) {
      throw new Error("Error agregando el producto al carrito " + error.message);
    }
  };

  //deleteProductById

  deleteCartProductID = async (idcart, id) => {
    try {
      
  const cartquery=await Cart.findById(idcart).populate("products.product"); 

  const indexProduct = cartquery.products.findIndex((r) => r.id==id) ;

  console.log(indexProduct);
  if (cartquery.length <= 0) {
    return { error: "no existe el carrito  id " + idcart };
  } else {
   

    const indexProduct = cartquery.products.findIndex((r) => r.id == id);
   
    cartquery.products.splice(indexProduct, 1);
   
    const reponse=await Cart.findByIdAndUpdate(idcart,cartquery)
  }

    return { message: "Producto borrado para el carrito " + idcart};
  
    } catch (error) {
      throw new Error("Error borrando el producto en el carrito " + error.message);
    }
  };


//actualizar 1 producto
updateCartProductID = async (idcart, id,quantity) => {
  try {
    
    const cartquery=await Cart.findById(idcart).populate("products.product"); 


if (cartquery.length <= 0) {
  return { error: "no existe el carrito  id " + idcart };
} else {


  const indexProduct = cartquery.products.findIndex((r) => r.id == id);


 
  if(indexProduct>=0)
  {
    cartquery.products[indexProduct].quantity=quantity;
    const reponse=await Cart.findByIdAndUpdate(idcart,cartquery)

  return { message: "Producto actualizado para el carrito " + idcart};
  }
}
  } catch (error) {
    throw new Error("Error actualizado el producto en el carrito " + error.message);
  }
};


deleteCart = async (idcart) => {
  
  try {

    const cartquery=await Cart.findById(idcart).populate("products.product"); 
    const productsDelete = new Array();
    cartquery.products=productsDelete;
    if (cartquery.length <= 0) {
      return { error: "no existe el carrito  id " + idcart };
    } else {
      const reponse=await Cart.findByIdAndUpdate(idcart,cartquery)
      
      
      return { message: "Carro borrado"};
    }

  } catch (error) {
    throw new Error("Error creando el carrito " + error.message);
  }

};


updateAllProduct = async (idcart,products) => {
  
  try {
    const cartquery=await Cart.findById(idcart).populate("products.product"); 
    if (cartquery.length <= 0) {
      return { error: "no existe el carrito  id " + idcart };
    } else {
    cartquery.products=products;
    const reponse=await Cart.findByIdAndUpdate(idcart,cartquery)};
  } catch (error) {
    throw new Error("Error creando el carrito " + error.message);
  }

};

}

export default CartManager;
