import {Router} from 'express';
import { ProductManager } from '../dao/fsManagers/ProductManagerBD.js';


const router =Router();
const auth = (req,res,next) =>{
  if(req.session?.user && req.session.user.username === 'admin@coderhouse.com'){
    return next()
  }
 
  //falta agregar rol
  //si el correo es admin@tt.cl se puede acceder
  return res.status(401).json({status:'fallo', message:'error autorizacion'})
}

const productClass = new ProductManager;

// esta data onwire se renderiza json
// para los onwire html se hace una vista ese es con res.render

export const getProducts = async (req,res) =>{
  try{
    //limit ok
    //page ok
    //query

    let page= parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    
    const productos= await productClass.traeTodo(req, res)
    
    return productos
    
    } catch(err){
      console.error(err)
    }
  


}


router.get('/', auth, async (req,res) =>{
 
  const productos = await getProducts(req,res)
 // console.log(productos)
  if (productos.statusCode === 200){
    const totalPag=[]
    let link
    for (let index = 1; index <= productos.response.totalPages; index++){
          if (!req.query.page){
            link=`http:\\localhost:8080\api\products&page=${index}`
          }
          else{
            link=`http:\\localhost:8080\api\products&page=${req.query.page}`
          }
          totalPag.push({page:index,link})
     }
     
     
    let parte2 ={
        totalPag,
        prevPage:productos.response.prevPage,
        nextPage:productos.response.nextPage,
        page:productos.response.page,
        hasPrevPage:productos.response.hasPrevPage,
        hasNextPage:productos.response.hasNextPage,      
        prevLink:productos.response.prevLink,
        
        nextLink:productos.response.nextLink
        } 
        
     res.render('index',{products:productos.response.payload, paginainf: parte2 }) 
}else{
  res.status(productos.statusCode).json({status:'error', error: productos.statusCode})
}
    
})


router.get('/:pid', async (request, response) =>{
  const id= request.params.pid;
  try{
     const producto =  await productClass.traeProductsBy(id);
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
  const result= await productClass.addProducto(productoNew);
 
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
          const result = await productClass.ModificarProducto(id, data)
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
    const result= productClass.BorrarProducto(code);
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