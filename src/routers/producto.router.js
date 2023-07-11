import {Router} from 'express';
import { ProductManager } from '../dao/fsManagers/ProductManagerBD.js';

const router =Router();

//endpoint crear producto
//endpoint leer producto id
//endpoint actualizar productos :id
// agregar producto
// borrar producto

const productClass = new ProductManager;
//productClass.path='./src/productos.json';
// esta data onwire se renderiza json
// para los onwire html se hace una vista ese es con res.render


router.get('/', async (req,res) =>{
  try{
    let page= parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 5
    const productos = await productClass.traeTodo(page,limit); 
    //res.status(201).json({status:"success", productos:products});
    //console.log(productos)
    res.render('index',productos)
  }
    catch (err) {
    
      //console.error(e)
  
      res.status(500).json({status:'error', error: err.message})
    } 
  
})


router.get('/:pid', async (request, response) =>{
  const id= request.params.pid;
  try{
     const producto =  await productClass.traeProductsBy(id);
     if (!producto) return response.status(404).json({message: `${id} NO EXISTE `})
  //response.json(producto)
      //console.log(producto)
      response.render('Producto',producto)
  } catch (err) {
    //console.error(e)
    response.status(500).json({status:'error', error: err.message})
  }
})

router.post('/', async (req,res) =>
{
   const productoNew= req.body;
   
try{
   const result= await productClass.addProducto(productoNew);
   //console.log(result)
  }catch (err) {
    
    console.error(err)

    res.status(500).json({status:'error', error: err.message})
  }  

  })  

    //actualizacion
router.put('/:id', async (request,response) =>{
      try{
          const id = request.params.id;
          const data= request.body;
          const result = await productClass.ModificarProducto(id, data)
          if (result){
               response.status(201).json({status: 'Producto no se encuentra Actualizado',payload:id})
          
          }else{
             response.status(201).json({status: 'Producto Actualizado',payload:id})
       
          }
                    //response.status(201).send({message: 'Producto Actualizado',id})
      }catch (err) {
    
        //console.error(e)
    
        res.status(500).json({status:'error', error: err.message})
      }  
})

//eliminacion
router.delete('/:id', async (request,response) =>{
  const id = request.params.id;
  try{
    const result= productClass.BorrarProducto(id);
    if(result== null){
      response.status(404).send({message: 'Producto No se encuentra',id})
     }
    response.status(200).json({status: 'Exito Producto Borrado',id})
  }
  catch (err) {
    //console.error(e)
    response.status(500).json({status:'error', error: err.message})
  }  

  
  //response.status(201).json({message: 'Producto Borrado',id})
  
})



export default router