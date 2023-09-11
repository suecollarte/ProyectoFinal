import {Router} from 'express';
import {mockProd} from '../utilsmock.js'
/* import ModificarProducto from "../controllers/productController.js"
import BorrarProducto  from "../controllers/productController.js"
import traeProductsBy from "../controllers/productController.js"
import addProducto from "../controllers/productController.js"
import getAllProducto from "../controllers/productController.js"
import traeTodo from "../controllers/productController.js"
 */
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


router.get('/', async (request, response) =>{
  
  const productos= await productController.getAllProducto(request,response)
  //console.log(productos.response.docs)
  response.render('index',{products: productos.response.docs }) 
 })

router.get('/:pid', async (request, response) =>{
  const id= request.params.pid;
  try{
     const producto =  await productController.traeProductsBy(id);
    if (producto.statusCode === 200){
     // console.log(producto.response.payload)
      response.render('indexprod',{products: producto.response.payload} )
    }
     if (!producto) return response.status(404).json({message: `${id} NO EXISTE `})
     // response.status(200).json({status: 'Producto',id})
    // response.json(producto)
  
    }catch(err){
      console.log(err)   //para tener el error en la consola
    
    }
    })


router.post('/', async (req,res) =>
{
   //const productoNew= req.body;
   
try{
  const result= await productController.addProducto(mockProd);
 
    if (typeof result == 'string') {
    const error = result.split(' ')
    return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
    }
    //
   //console.log(productoNew)
   //res.redirect('/api/products/')
   res.send({status:'success',payload:products})
      
   // res.status(201).json({ status: 'success', payload: result })
  }catch(err){
    console.log(err)   //para tener el error en la consola
    throw new Error(err)
  } 
  }) 




export default router