import  ProductService  from '../services/product.service.js';
const ProductServiceInst = new ProductService()

 
const traeTodo = async (req, res)=> {
  
 const  result = await ProductServiceInst.traeTodo(req,res)  
  res.json(result) 
 
}

const getAllProducto = async (req,res)=> {
   
  const productos = await ProductServiceInst.getAllProducto(req,res)  
  //console.log(productos)
  if (productos.statusCode === 200){
   return productos
}else{
  res.status(productos.statusCode).json({status:'error', error: productos.statusCode})
}
  
  //console.log("result",result)
  //return result
  //res.json(result) 
 
}
const  addProducto = async(data)=>{
//productrepositorio
console.log(data)
const result= await ProductServiceInst.addProducto(data)
res.json(result) 
}

const  addManyProducto = async(data)=>{
  //productrepositorio
  const result= await ProductServiceInst.addManyProducto(data)
  //res.json(result) 
  return result
  }

 const  traeProductsBy = async(_id) => {
  const result = await ProductServiceInst.traeProductsBy(_id)
  res.json(result) 
 }

 const  BorrarProducto = async(_id) =>{
  const result= await ProductServiceInst.BorrarProducto(_id)
    
    
 }

 const ModificarProducto = async(id,data) =>{

try{
  const result= await ProductServiceInst.ModificarProducto({_id:id},{
    $set:data})
}
catch(e){
  console.error(e);;
}    
      
  
 }
 
 export default {
  ModificarProducto,BorrarProducto,traeProductsBy,
  addProducto,getAllProducto,traeTodo, addManyProducto
 }


