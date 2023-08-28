import {Router} from 'express';
import { getAllProductController } from '../controllers/productController.js';
import { traeProductsByController } from '../controllers/productController.js';
import { ModificarProductoController } from '../controllers/productController.js';
import { addProductoController } from '../controllers/productController.js';
import { BorrarProductoController } from '../controllers/productController.js';
const router =Router();
const auth = (req,res,next) =>{
  
  if(req.session?.user ){
  //if(req.session?.user && req.session.user.username === 'admin@coderhouse.com'){
    return next()
  }
 
  //falta agregar rol
  //si el correo es admin@tt.cl se puede acceder
  return res.status(401).json({status:'fallo', message:'error autorizacion'})
}


// esta data onwire se renderiza json
// para los onwire html se hace una vista ese es con res.render




router.get('/', async (req,res) =>{
 
  const productos= await getAllProductController(req,res)
 
  if (productos.statusCode === 200){
     res.render('index',{products:productos.response.docs}) 
}else{
  res.status(productos.statusCode).json({status:'error', error: productos.statusCode})
}
    
})


router.get('/:pid', async (request, response) =>{
  const id= request.params.pid;
  try{
     const producto =  await traeProductsByController(id);
    if (producto.statusCode === 200){
     // console.log(producto.response.payload)
      response.render('indexprod',{producto: producto.response.payload} )
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
  const result= await addProductoController(productoNew);
 
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
          const result = await ModificarProductoController(id, data)
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
    const result= BorrarProductoController(code);
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