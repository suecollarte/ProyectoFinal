import { ProductService } from '../services/product.service.js';
import productModel from '../models/product.model.js'

 
export const traeTodoController = async (req, res)=> {
  const result = await ProductService.getAll(req,res)  
  res.json(result) 
 
}

export const getAllProductController = async (req, res)=> {
  const result = await ProductService.getAllPaginacion(req,res)  
  res.json(result) 
 
}
export const  addProductoController = async(data)=>{
//productrepositorio
const result= await ProductService.addProducto(data)
res.json(result) 
}


export const  traeProductsByController = async(_id) => {
  const result = await ProductService.traeProductsBy(_id)
  res.json(result) 
 }

 export const  BorrarProductoController = async(_id) =>{
  const result= await ProductService.BorrarProducto(_id)
    
    
 }

 export const ModificarProductoController = async(id,data) =>{

try{
  const result= await ProductService.ModificarProducto({_id:id},{
    $set:data})
}
catch(e){
  console.error(e);;
}    
      
  
 }
 


