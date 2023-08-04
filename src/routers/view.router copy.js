import {Router} from 'express';
import { getProducts } from './producto.router.js';
import { getProductsFromCart } from './cart.router.js';


const router = Router()

router.get('/', async (req, res) =>{
    let page= parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    const result = await getProducts(req,res)

    let prevLink
   if(!req.query.page && page==1){
     prevLink=`http://localhost:8080/api/products?page=${page}`
   }else{
     prevLink =`http://localhost:8080/api/products?page=${productos.prevPage}`
     
   }
   let nextLink
   if(!req.query.page){
     nextLink =`http://localhost:8080/api/products?page=${productos.nextPage}`
   }else{
     nextLink=`http://localhost:8080/api/products?page=${page}`
   }

   const user = req.session.user


    if (result.statusCode === 200){
         //console.log(productos.response.payload)
         res.render('carrito',{products:result.response.payload, paginainf: parte2 , user}) 
    }else{
      res.status(result.statusCode).json({status:'error', error: result.response.error})
      console.log('error')
    }
})


router.get('/:cid', async (req , res ) =>{
    try{
     const result =  await getProductsFromCart(req,res);
   //console.log(result)
   if (result.statusCode === 200){
     res.render('productsFromCart',{cart:result.response.payload})
   } else {
    res.status(result.statusCode).json({status: 'error', error:result.response.error})
   }
  } catch(err){
    console.error(err)
  }
  })

  export default router