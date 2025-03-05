import express from "express"
import CartManager from "../classManager/CartManager.js"


const cartRouter = express.Router();

const cartManager = new CartManager();


//GET  "/api/cart/:pid"

cartRouter.get("/:id",async(req,res)=> {

    try {
        const{id}=req.params;
        const data = await cartManager.getCartID(id)  
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
            res.status(200).send({status:"sucess", 
                payload: data }); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


//POST "/api/cart/"

cartRouter.post("/",async(req,res)=> {

    try {
        const{id}=req.params;
        const data = await cartManager.addCart();
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }  
            res.status(201).send({status:"sucess", 
                payload: data }); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


//POST /api/cart/productId"

cartRouter.post("/product/",async(req,res)=> {

    try {
        const{idcart,id,quantity}=req.query;
       
       
        const data = await cartManager.addCartProductID(idcart,id,quantity) ;
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            } 
            res.status(201).send({status:"sucess", 
                payload: data }); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


cartRouter.delete("/product/",async(req,res)=> {

    try {
        const{idcart,id}=req.query;
       
       
        const data = await cartManager.deleteCartProductID(idcart,id) ;
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            } 
            res.status(200).send({status:"sucess", 
                payload: data }); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})



cartRouter.put("/:cid/product/:pid",async(req,res)=> {

    try {

        const{cid,pid}=req.params;
        const{quantity}=req.query;

       
        const data = await cartManager.updateCartProductID(cid,pid,quantity) ;
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            } 
            res.status(200).send({status:"sucess", 
                payload: data }); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})  

cartRouter.delete("/:cid",async(req,res)=> {

    try {

        const{cid}=req.params;
    
       
        const data = await cartManager.deleteCart(cid) ;
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            } 
            res.status(200).send({status:"sucess", 
                payload: data }); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})



cartRouter.put("/:cid",async(req,res)=> {

    try {
        const products=req.body;
        const data = await cartManager.updateAllProduct(products);
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
            res.status(200).send({status:"sucess", 
                payload: data }); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})





export default cartRouter;