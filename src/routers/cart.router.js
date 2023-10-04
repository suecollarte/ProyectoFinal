import {Router} from 'express';
import { ProductManager } from '../dao/Managers/ProductManagerBD.js';
import { CartManager } from '../dao/Managers/CartManagerDB.js';


const router =Router();


const cartClass = new CartManager;
//cartClass.path='./src/cart.json';

//productClass.path='./src/productos.json';
 const productClass = new ProductManager;
//controller
export const getCarros = async (req,res) =>{
  try{
    //limit ok
    //page ok
    //query

    let page= parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    
    const carts= await cartClass.traeTodo(req, res)
    
    return carts
    
    } catch(err){
      console.error(err)
    }
  


}

export const getProductsFromCart = async (req,res) =>{
try{
  const id=req.params.cid
  const result = await cartClass.traeCartBy(id)
 
  if(result == null){
    return {
      statusCode:404, response: {status:'error', error:'No se encuentra carro'}
    }
  }
  return {statusCode:200, response: {status:'success', payload:result}}
  } catch(err){
    console.error(err)
  }
}



//muestra productos de los carts
router.get('/', async (req,res) =>{
  const carts = await getCarros(req,res)
 
console.log(carts)

  if (carts.statusCode === 200){
    const totalPag=[]
    let link
    for (let index = 1; index <= carts.response.totalPages; index++){
          if (!req.query.page){
            link=`http:\\localhost:8080\api\carts&page=${index}`
          }
          else{
            link=`http:\\localhost:8080\api\carts&page=${req.query.page}`
          }
          totalPag.push({page:index,link})
     }
     
     
    let parte2 ={
        totalPag,
        prevPage:carts.response.prevPage,
        nextPage:carts.response.nextPage,
        page:carts.response.page,
        hasPrevPage:carts.response.hasPrevPage,
        hasNextPage:carts.response.hasNextPage,      
        prevLink:carts.response.prevLink,
        
        nextLink:carts.response.nextLink
        } 
     //ojo con el nombre carros: debe ir en el handlebars   
     res.render('index_carro',{carros:carts.response.payload, paginainf: parte2 }) 
}else{
  res.status(carts.statusCode).json({status:'error', error: carts.statusCode})
}
    
})

router.post('/', async (req,res) =>{
    try{
       const data = req.body
       const timestamp = {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
    d
        const result = await cartClass.addCart(data, timestamp);
        //console.log(result)
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
          const productos= 
          await cartClass.modificarCart(id, data)
          response.status(201).json({message: 'Carro Actualizado',id})
      }catch (e) {
        console.error(e)
      }   
    
})

router.put('/:cid/purchase', async (request,response) =>{
  try{
          const id = request.params.cid;
          const data= request.body;
          const result = await cartClass.traeCartBy(id)
          const productid= result.product[0].pid
          const cantidadProd= result.product[0].quantity
          const cantidad = await productClass.traeProductsBy(productid)
          if(cantidad > cantidadProd){
             await cartClass.modificarCart(id, data)
          response.status(201).json({message: 'Carro Actualizado',id})
          }else{
            await cartClass.BorrarCartProducto(id,productid)
            response.status(400).json({message: 'No hay suficiente para realizar compra',id})
          }
         
      }catch (e) {
        console.error(e)
      }   
    
})
//eliminacion
router.post('/borra/:cid/product/:pid', async (request,response) =>{
  const cid= request.params.cid;  
  const pid= request.params.pid;  

  try{
   const result= cartClass.BorrarCartProducto(cid,pid);
    if(result== null){
      response.status(404).send({message: 'Carro Producto No se encuentra',cid})
    }
    //response.status(200).json({status: 'Exito Carro Producto Borrado',cid})  
    res.redirect('/api/products/')
    
  }
  catch (err) {
    //console.error(e)
    response.status(500).json({status:'error', error: err.message})
  }  

  
  //response.status(201).json({message: 'Producto Borrado',id})
  
})
export default router