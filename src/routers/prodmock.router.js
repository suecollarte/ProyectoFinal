import {Router} from 'express';
import {mockProd} from '../utilsmock.js'
import { logger } from '../utils/logger.js'
import productController from "../controllers/productController.js"
const router =Router(); 
const auth = (req,res,next) =>{
  
  if(req.session?.user ){
  //if(req.session?.user && req.session.user.username === 'admin@coderhouse.com'){
    //console.log("aca session") 
    return next()
  }
 
  //falta agregar rol
  //si el correo es admin@tt.cl se puede acceder
  return res.status(401).json({status:'fallo', message:'error autorizacion'})
}




router.get('/', async (req,res) =>
{
   //const productoNew= req.body;
   const products=[]
   logger.debug("mockProd /")
   logger.http("mockProd /")
   logger.info("mockProd /")
try{
  
  for (let index=0 ; index < 50 ; index ++){
    products.push(mockProd())
  /* 
    // */
   //console.log(result)
  }
   //res.redirect('/api/products/')
   const result= await productController.addManyProducto(products);
 
    if (typeof result == 'string') {
    const error = result.split(' ')
    return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
    }
   //res.send({status:'success',payload:products})
   response.render('index',{products: result }) 
      
   // res.status(201).json({ status: 'success', payload: result })
  }catch(err){
    logger.error(err)   //para tener el error en la consola
    
  } 
  }) 




export default router