import {Router} from 'express';

import { ProductManager } from '../dao/fsManagers/ProductManagerBD.js';


import { CartManager } from '../dao/fsManagers/CartManagerDB.js';


const router =Router();


const cartClass = new CartManager;
cartClass.path='./src/cart.json';

const productClass = new ProductManager;
productClass.path='./src/productos.json';


router.get('/:cid', async (request, response) =>{
  try{
  const id= request.params.cid;
  const cart =  await cartClass.traeCartBy(id);
 
  if (!cart) return response.status(404).json({message: `${id} NO EXISTE `})
    response.status(201).send(cart)
    response.render('carrito',cart)
  }catch (e) {
    console.error(e)
  }
})

//agrega carts
router.post('/', async (request,response) =>{
    
    const {idCliente, product}=request.body;
    //product y quantity
    const ProdCart={idCliente, product};
    const producto= product[0].product;
    const existe =  productClass.encuentraCodigo(producto);
    let id="";
    if(existe){
     id = await cartClass.addCart(ProdCart);
    }
    response.status(201).send({message: 'Carro Creado',data: {id, ProdCart} })
   
  })  
    //agrega producto a un carro
router.post('/:cid/product/:pid', async (request,response) =>{

  try{
  const cid= request.params.cid;  
  const pid= request.params.pid;  
  const product=request.body;
    //product y quantity
    const existe=await cartClass.traeCartBy(cid);
    if(existe){
      await cartClass.modificarCart(cid, existe,product);
    }
   response.status(201).send({message: 'Producto Creado/Modificado',data: existe})

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