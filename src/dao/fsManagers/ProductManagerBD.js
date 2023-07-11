import productModel from '../models/product.model.js';

export class ProductManager{
  constructor(path,producto){
  //this.cuenta=0
  this.path=path 
  }
  static producto=[]

generaID = () =>(this.producto.length === 0) ? 1: this.producto[this.producto.length -1].id +1

traeTodo = async (page,limit)=> {
  try{
   // console.log("log");
   //const productos =await productModel.find()
  const productos =await productModel.paginate({},{page,limit,lean:true})
   productos.prevLink = productos.hasPrevPage
                        ? `/product?page=${productos.prevPage}`
                        :''
    productos.nextLink = productos.hasNextPage
    ? `/product?page=${productos.nextPage}`
    :''  

    //console.log(productos)
    return productos
  }
  catch (e) {
    console.error(e)
  }  
     
 
}


addProducto = async(data)=>{
        //console.log(data)
  try{
         //console.log("grabando");
          const productos= new productModel(data)
          const result= await productos.save();        
          return result
          
    }
  catch(e){
    console.error(e);
  }

 }


traeProductsBy = async(_id) =>
 {

      try{
          const producto =  await productModel.findById(_id).lean().exec();
         
          if(producto === null)
          { 
            return false
          }
          else
          { 
          return producto;
          }
    }
    catch(e){
      console.error(e);;
    }
 }

 BorrarProducto = async(id) =>{
 
    try{
     const result = await productModel.findByIdAndDelete(id)
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

