import { ProductService } from '../services/product.service.js';

 
export const traeTodo = async (req, res)=> {
  const result = await ProductService.getAll(req,res)  
  res.json(result) 
 
}

export const getAllProductController = async (req, res)=> {
  const result = await ProductService.getAllPaginacion(req,res)  
  res.json(result) 
 
}
export const  addProductoController = async(data)=>{
//productrepositorio
const result= await ProductService.addProductoController(data)
res.json(result) 
}


export const  traeProductsBy = async(_id) => {
  const result = await ProductService.traeProductsBy(_id)
  res.json(result) 
 }

 export const  BorrarProducto = async(_id) =>{
 
    
    
 }

 export const ModificarProducto = async(id,data) =>{

try{
  const result= await productModel.findByIdAndUpdate({_id:id},{
    $set:data})
}
catch(e){
  console.error(e);;
}    
      
  
 }
 


