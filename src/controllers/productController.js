import  ProductService  from '../services/product.service.js';

console.log("productservice",ProductService)
 
const traeTodoController = async (req, res)=> {
  
 const  result = await ProductService.getAll(req,res)  
  res.json(result) 
 
}

const getAllProductController = async (req)=> {
  console.log("aca")
  const result = await ProductService.getAllPaginacion(req)  
  res.json(result) 
 
}
const  addProductoController = async(data)=>{
//productrepositorio
const result= await ProductService.addProducto(data)
res.json(result) 
}


 const  traeProductsByController = async(_id) => {
  const result = await ProductService.traeProductsBy(_id)
  res.json(result) 
 }

 const  BorrarProductoController = async(_id) =>{
  const result= await ProductService.BorrarProducto(_id)
    
    
 }

 const ModificarProductoController = async(id,data) =>{

try{
  const result= await ProductService.ModificarProducto({_id:id},{
    $set:data})
}
catch(e){
  console.error(e);;
}    
      
  
 }
 
 export default {
  ModificarProductoController,BorrarProductoController,traeProductsByController,
  addProductoController,getAllProductController,traeTodoController
 }


