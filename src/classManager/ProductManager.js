
import fs from "fs";

import Product from "../models/product.model.js";
import { query } from "express";

class ProductManager {
  constructor(pathfile) {
    this.pathfile = pathfile;
  }

  //getProducts

  getProducts = async () => {

    try {  
      const products=await Product.find().lean();  
      return products;
      
     
    } catch (error) {
      throw new Error("Error consultando los productos " + error.message);
    }
  };

  //getProductById
  getProductID = async (id) => {
    try {

      const products=await Product.findOne({ids:id}) 
      return products;
 
    } catch (error) {
      throw new Error("Error consultando el producto " + error.message);
    }
  };

  //addProduct
  addProductID = async (product) => {
    try {
      var ids = 1;

      var products=await Product.find(); 
     
      if(   products.length>0)
      {
        ids = Math.max(...products.map((obj) => obj.ids || 0)) + 1;
      }


      var { title, description, code, price, stock, category, thumbnail } =
        product;
      var status = true;
      thumbnail="";

      const reponse=await Product.insertOne({  ids,
        title,
        description,
        code,
        price,
        stock,
        status,
        category,
        thumbnail,});
        
        
      return reponse;


    } catch (error) {
      throw new Error("Error creando el producto " + error.message);
    }
  };

  //setProductById

  setProductID = async (id, product) => {

    var uid = id;
    const  update=product;
    try {
         const reponse=await Product.updateOne({ids:uid},update)
         return   ({message:"Producto actualizado " })

    } catch (error) {
      throw new Error("Error actualizando el producto " + error.message);
    }
  };

  //deleteProductById

  deleteProductID = async (id) => {
    try {

   const reponse =await Product.deleteOne({ids:id});

        return ({message:"Producto Borrado " })
      
    } catch (error) {
      throw new Error(" Error borrando el  producto " + error.message);
    }
  };




  //getProducts

  getProductsPagination = async (pPage,plimit,pSort,pQuery) => {


    try {  
      var products;
     

      if(pQuery===null)
      {
       products=await Product.paginate({},{page:pPage,limit:plimit,lean:true,sort:pSort});  
      }

      else{

        var myobj = JSON.parse(pQuery);
     
         products=await Product.paginate(myobj,{page:pPage,limit:plimit,lean:true,sort:pSort});  
      }
      return products;
      
     
    } catch (error) {
      throw new Error("Error consultando los productos " + error.message);
    }
  };
}
export default ProductManager;
