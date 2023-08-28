import {Router} from 'express';
import ProductController  from '../controllers/productController.js';
import { getProductsFromCart } from './cart.router.js';


const router = Router()

router.get('/', async (req, res) =>{
    let page= parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    const result = await ProductController.getAllProductController(req,res)
    const user = req.session.user
console.log(result)
     if (result.statusCode === 200){
        res.render('carrito',{products:result.response, user }) 
    }else{
     res.status(result.statusCode).json({status:'error', error:result.statusCode})
      //console.log('error')
    }
})


router.get('/:cid', async (req , res ) =>{
    try{
     const result =  await ProductController.getProductsFromCart(req,res);
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