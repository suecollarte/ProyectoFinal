import productModel from '../../models/product.model.js';

export class ProductManager{
  constructor(path,producto){
  //this.cuenta=0
  this.path=path 
  }
  
traeTodo = async (req, res)=> {
  let page= parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 10
    
  const filtroOpciones ={}
  if(req.query.stock) filtroOpciones.stock = req.query.stock
  if (req.query.category) filtroOpciones.category= req.query.category

  const paginacionOpciones= {lean:true,limit:limit,page:page}
  //sort
  if (req.query.sort == "asc") paginacionOpciones.sort ={ price:1}
  if (req.query.sort == "desc") paginacionOpciones.sort ={ price: -1}
  try{
   
   //const productos =await productModel.find(
 
  const productos =await productModel.paginate(filtroOpciones, paginacionOpciones)
 //console.log("PRODUCTOS")
 // console.log(productos)

    return {
      statusCode:200,
      response:productos
    }
  }
  catch (err) {
    return{
      statusCode:500,
      response:{status:err, error:err.message}
    }
    
  }  
     
 
}


addProducto = async(data)=>{
  try{
         // console.log("grabando");
          const Producto= new productModel(data)
          const err= await Producto.save().catch(err=>err); 
          return err               
    }
  catch(e){
    console.error(e);
  }

 }


traeProductsBy = async(_id) =>
 {

      try{
        //await productModel.paginate
          const producto =  await productModel.findById(_id).lean().exec();
      
          if(producto === null)
          { 
            return false
          }
          else
          { 
            return {
              statusCode:200,
              response:{
                status:'success',
                payload: producto
              }}
          }
    }
    catch(e){
      console.error(e);;
    }
 }

 BorrarProducto = async(_id) =>{
 
    try{
     const result = await productModel.findByIdAndDelete(_id)
    
     if(result== null){
      return false
     }
     const products = await productModel.find().lean().exec()
     return products
    }
    catch(e){
      console.error(e);;
    } 
    
 }

ModificarProducto = async(id,data) =>{

try{
  const result= await productModel.findByIdAndUpdate({_id:id},{
    $set:data})
}
catch(e){
  console.error(e);;
}    
      
  
 }
 
}

