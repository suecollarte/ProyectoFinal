import {Router} from 'express';
/* import ModificarProducto from "../controllers/productController.js"
import BorrarProducto  from "../controllers/productController.js"
import traeProductsBy from "../controllers/productController.js"
import addProducto from "../controllers/productController.js"
import getAllProducto from "../controllers/productController.js"
import traeTodo from "../controllers/productController.js"
 */
import productController from "../controllers/productController.js"
import logger from '../utils/logger.js'

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
   const productoNew= req.body;
   
try{
  const result= await productController.addProducto(productoNew);
 
    if (typeof result == 'string') {
    const error = result.split(' ')
    return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6) })
    }
    //
   //console.log(productoNew)
   res.redirect('/api/products/')
    
      
   // res.status(201).json({ status: 'success', payload: result })
  }catch(err){
    console.log(err)   //para tener el error en la consola
    throw new Error(err)
  } 
  }) 



    //actualizacion
router.put('/:id', async (request,response) =>{
      try{
          const id = request.params.id;
          const data= request.body;
          const result = await productController.ModificarProducto(id, data)
          if (result){
               response.status(201).json({status: 'Producto no se encuentra Actualizado',payload:id})
          
          }else{
             response.status(201).json({status: 'Producto Actualizado',payload:id})
       
          }
                    //response.status(201).send({message: 'Producto Actualizado',id})
                  }catch(err){
                    console.log(err)   //para tener el error en la consola
                    throw new Error(err)
                  }   
                  })

//eliminacion
router.get('/borre/:id', async (request,response) =>{
  const code = request.params.id;
  
    
   try{
    const result= productController.BorrarProducto(code);
    if(result== null){
      response.status(404).send({message: 'Producto No se encuentra',code})
     }
   // const productos = await productClass.traeTodo(1,25);
   // response.render('index',productos)
    response.status(200).json({status: 'Exito Producto Borrado',code})
  }catch(err){
    console.log(err)   //para tener el error en la consola
    
  }
  })

export default router