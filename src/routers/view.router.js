import {Router} from 'express';
import { getProducts } from './producto.router.js';
import { getProductsFromCart } from './cart.router.js';


const router = Router()

router.get('/', async (req, res) =>{
    let page= parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    const productos = await getProducts(req,res)

    let prevLink
   if(!req.query.page && page==1){
     prevLink=`http://localhost:8080/api/products?page=${page}`
   }else{
     prevLink =`http://localhost:8080/api/products?page=${productos.prevPage}`
     
   }
   let nextLink
   if(!req.query.page){
     nextLink =`http://localhost:8080/api/products?page=${productos.nextPage}`
   }else{
     nextLink=`http://localhost:8080/api/products?page=${page}`
   }

   
   const result ={
    statusCode:200,
    response:{
     payload: productos.docs,
     status:'success',
     prevPage:productos.prevPage,
     nextPage:productos.nextPage,
     page:productos.page,
     hasPrevPage:productos.hasPrevPage,
     prevLink:productos.hasPrevPage?prevLink:null,
     hasNextPage:productos.hasNextPage,      
     nextLink:productos.hasNextPage?nextLink:null
    } }
      


    if (result.statusCode === 200){
        const totalPag=[]
        let link
        for (let index = 1; index <= result.response.totalPages; index++){
              if (!req.query.page){
                link=`http:\\localhost:8080\api\products&page=${index}`
              }
              else{
                link=`http:\\localhost:8080\api\products&page=${req.query.page}`
              }
              totalPag.push({page:index,link})
         }
       
        
        const parte2 ={
            totalPag,
            prevPage:result.response.prevPage,
            nextPage:result.response.nextPage,
            page:result.response.page,
            hasPrevPage:result.response.hasPrevPage,
            hasNextPage:result.response.hasNextPage,      
            prevLink:result.response.prevLink,
            
            nextLink:result.response.nextLink
            } 
          console.log(productos.response.payload)
         res.render('carrito',{products:result.response.payload, paginainf: parte2 }) 
    }else{
      res.status(result.statusCode).json({status:'error', error: result.response.error})
      console.log('error')
    }
})


router.get('/:cid', async (req , res ) =>{
    try{
     const result =  await getProductsFromCart(req,res);
   console.log(result)
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