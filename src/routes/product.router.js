import express from "express"
import ProductManager from "../classManager/ProductManager.js"



const productRouter = express.Router();
const file="./src/data/products.json";
const productManager = new ProductManager(file);

//GET  "/api/products" 
productRouter.get("/",async(req,res)=> {



        try { 
            
            const page =parseInt( req.query.page)|| 1;
            const limit =parseInt( req.query.limit)|| 10;
            const sort = req.query.sort;
            const querys = req.query.querys|| null;
            const products = await productManager.getProductsPagination(page,limit,sort,querys);
      
            var prevlink=null;
            var nextlink=null;

            if(products.hasPrevPage)
            {
              prevlink="/?page="+products.prevPage
            }

            if(products.hasNextPage)
                {
                    nextlink="/?page="+products.nextPage
                }


            res.status(200).send({status:"sucess", 
                payload: products.docs,
                totalPages:products.totalPages,
                prevPage:products.prevPage,
                nextPage:products.nextPage,
                page:products.page,
                hasPrevPage:products.hasPrevPage,
                hasNextPage:products.hasNextPage,
                prevPage:prevlink,
                nextPage:nextlink
             });

        } catch (error) {
            res.status(500).send({message: error.message});
        }

})


//GET  "/api/product/:pid"

productRouter.get("/:id",async(req,res)=> {

    try {
        const{id}=req.params;
      
       
        const data = await productManager.getProductID(id)
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
      
      
        res.status(200).send(data);

        
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})


//POST "/api/product
productRouter.post("/",async(req,res)=> {

    try {
        const body=req.body;
        const data = await productManager.addProductID(body);
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})



//PUT  "/api/product/:pid"

productRouter.put("/:id",async(req,res)=> {

    try {
        const{id}=req.params;
        const body=req.body;
        const data = await productManager.setProductID(id,body);
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})

//DELETE  "/api/product/:pid"

productRouter.delete("/:id",async(req,res)=> {

    try {
        const{id}=req.params;
        const data = await productManager.deleteProductID(id);
        if( data.hasOwnProperty('error'))
            {
                res.status(500).send(data);
            }
        res.status(200).send(data); 
    } catch (error) {
        res.status(500).send({message: error.message});
    }

})




export default productRouter;
