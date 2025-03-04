import fs from "fs";
import Cart from "../models/cart.model.js";
class CartManager {
  constructor(pathfile) {
    this.pathfile = pathfile;
  }

  getCartID = async (id) => {
    
      try {

        const cartquery=await Cart.findOne({id:id}).lean(); 
        return cartquery;
   
      } catch (error) {
        throw new Error("Error consultando el carrito " + error.message);
      }
   
  };

  //addCart
  addCart = async () => {
  
    try {
      var id = 1;

      var cartquery=await Cart.find(); 
     
      if(   cartquery.length>0)
      {
        id = Math.max(...products.map((obj) => obj.id || 0)) + 1;
      }

      const products = new Array();
     

      const reponse=await Cart.insertOne({  id,products});
        
        
        return { message: "Carro creado"};


    } catch (error) {
      throw new Error("Error creando el carrito " + error.message);
    }

  };

  //addProductById
  addCartProductID = async (idcart, id, quantity) => {
    try {
      
      const cartquery=await Cart.findOne({id:idcart})

      if (cartquery.length <= 0) {
          return { error: "no existe el carrito  id " + idcart };
        } else {
          id=  parseInt(id)
          cartquery.products.push({id , quantity });
        
          const reponse=await Cart.updateOne({id:idcart},cartquery)

          return { message: "Producto Agregado para el carrito " + idcart};
        }
      
    } catch (error) {
      throw new Error("Error agregando el producto al carrito " + error.message);
    }
  };

  //deleteProductById

  deleteCartProductID = async (idcart, id) => {
    try {
      
const cartquery=await Cart.findOne({id:idcart}).lean();  

if (cartquery.length <= 0) {
    return { error: "no existe el carrito  id " + idcart };
  } else {
   

    const indexProduct = cartquery.products.findIndex((r) => r.id == id);
   
    cartquery.products.splice(indexProduct, 1);
   
    const reponse=await Cart.updateOne({id:idcart},cartquery)

    return { message: "Producto Agregado para el carrito " + idcart};
  }
    } catch (error) {
      throw new Error("Error borrando el producto en el carrito " + error.message);
    }
  };


//actualizar 1 producto
updateCartProductID = async (idcart, id,quantity) => {
  try {
    
const cartquery=await Cart.findOne({id:idcart}) 




if (cartquery.length <= 0) {
  return { error: "no existe el carrito  id " + idcart };
} else {


  const indexProduct = cartquery.products.findIndex((r) => r.id == id);
 
  if(indexProduct>=0)
  {
    cartquery.products[indexProduct].quantity=quantity;
  const reponse=await Cart.updateOne({id:idcart},cartquery)

  return { message: "Producto actualizado para el carrito " + idcart};
  }
}
  } catch (error) {
    throw new Error("Error actualizado el producto en el carrito " + error.message);
  }
};


deleteCart = async (idcart) => {
  
  try {

    const cartquery=await Cart.findOne({id:idcart}) 
    const productsDelete = new Array();
    cartquery.products=productsDelete;
    if (cartquery.length <= 0) {
      return { error: "no existe el carrito  id " + idcart };
    } else {
    const reponse=await Cart.updateOne({id:idcart},cartquery)
      
      
      return { message: "Carro borrado"};
    }

  } catch (error) {
    throw new Error("Error creando el carrito " + error.message);
  }

};


updateAllProduct = async (idcart,products) => {
  
  try {
    const cartquery=await Cart.findOne({id:idcart}) 
    if (cartquery.length <= 0) {
      return { error: "no existe el carrito  id " + idcart };
    } else {
    cartquery.products=products;
    const reponse=await Cart.updateOne({id:idcart},cartquery)}
  } catch (error) {
    throw new Error("Error creando el carrito " + error.message);
  }

};

}

export default CartManager;
