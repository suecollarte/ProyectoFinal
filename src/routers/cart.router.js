import {Router} from 'express';
import { ProductManager } from '../dao/fsManagers/ProductManagerBD.js';
import { CartManager } from '../dao/fsManagers/CartManagerDB.js';


const router =Router();


const cartClass = new CartManager;
//cartClass.path='./src/cart.json';

//productClass.path='./src/productos.json';
const productClass = new ProductManager;
//controller
export const getProductsFromCart = async (req,res) =>{
try{
  const id=req.params.cid
  const result = await cartClass.traeCartBy(id)
  if(result == null){
    return {
      statusCode:404, response: {status:'error', error:'No se encuentra carro'}
    }
  }
  return {
      statusCode:200, response: {status:'success', payload:result}
    }
  } catch(err){
    console.error(err)
  }
}



//muestra productos para seleccionar carts
/* router.get('/', async (request,response) =>{
  const productos= await productClass.traeTodo(request, response)
  if (productos.statusCode === 200){
  console.log(productos.response.payload)
   response.render('carrito',{products:productos.response.payload}) 
}else{
console.log("error")
response.status(productos.statusCode).json({status:'error', error: productos.response.error})
}
}) */

router.post('/', async (req,res) =>{
    try{
      
        const result = await cartClass.addCart(req,res);
        res.status(201).json({status:'success',payload:result})
    }catch (err){

      res.status(500).json({ status:'error', error:err.message})
    }
    
     
   
  })  
    //agrega producto a un carro
router.post('/:cid/product/:pid', async (request,response) =>{

  try{
  const cid= request.params.cid;  
  const pid= request.params.pid;  
  const product=request.body;
console.log("ssss")
  
      const result= await cartClass.addCartProd(cid,pid)
      if(result.statusCode===200)
      { 
        res.status(201).json({status:'success',payload:result})
      }
      

  }catch (e) {
    console.error(e)
  }
    }) 

//actualizacion
router.put('/:cid', async (request,response) =>{
  try{
          const id = request.params.cid;
          const data= request.body;
          await cartClass.modificarCart(id, data)
          response.status(201).json({message: 'Carro Actualizado',id})
      }catch (e) {
        console.error(e)
      }   
    
})


//eliminacion
router.delete('/:cid/product/:pid', async (request,response) =>{
  const cid= request.params.cid;  
  const pid= request.params.pid;  
  try{
    const result= cartClass.BorrarCartProducto(cid,pid);
    if(result== null){
      response.status(404).send({message: 'Carro Producto No se encuentra',id})
     }
    response.status(200).json({status: 'Exito Carro Producto Borrado',id})
  }
  catch (err) {
    //console.error(e)
    response.status(500).json({status:'error', error: err.message})
  }  

  
  //response.status(201).json({message: 'Producto Borrado',id})
  
})
export default router