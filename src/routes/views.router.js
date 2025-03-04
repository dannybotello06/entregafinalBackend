import express from "express";

import ProductManager from "../classManager/ProductManager.js"
import CartManager from "../classManager/CartManager.js"
const viewsRouter = express.Router();
const file="./src/data/products.json";
const productManager = new ProductManager(file);
const cartManager = new CartManager(file);

viewsRouter.get("/", async(req,res) =>{
    try {


        const page =parseInt( req.query.page)|| 1;
        const limit =parseInt( req.query.limit)|| 10;
        const sort = req.query.sort;
        const querys = req.query.querys|| null;

        const products = await productManager.getProductsPagination(page,limit,sort,querys);
      
        res.render("home",products);
             
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})


viewsRouter.get("/realTimeProducts", async(req,res) =>{
    try {
        const products = await productManager.getProducts();
        res.render("realTimeProducts",{products});
             
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

viewsRouter.get("/productDetails", async(req,res) =>{
    try {

        const ids =parseInt( req.query.product);
        const product = await productManager.getProductID(ids)

      
        res.render("productDetails",product);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})


viewsRouter.get("/cart/:id", async(req,res) =>{
    try {

        const{id}=req.params;
        const cart = await cartManager.getCartID(id);
        res.render("cart",cart);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})
export default viewsRouter;
