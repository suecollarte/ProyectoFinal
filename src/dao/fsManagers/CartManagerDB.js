import  cartModel from '../models/cart.model.js';
import  productModel  from '../models/product.model.js';


export class CartManager{
  constructor(path,cart){
  //this.cuenta=0
  this.path=path
 
  
  }
  static cart=[];
  

traeTodoCart = async () => {
  try{  
     
      this.cart= await cartModel.find()
      return this.cart; 
  }
  catch (error){
    console.error(error);
  }

}
addCart = async (req,res) =>{
  try{
    // console.log("grabando");
     const Carro= new cartModel()
     const err= await Carro.save().catch(err=>err); 
     console.log(err)
     return err               
}
catch(e){
console.error(e);
}

}
addCartProd = async(cid,pid)=>{
        
  try{       
        //let car = await cartModel.find(cid);
       console.log("wwww")
         let car= await cartModel.updateOne({_id:cid},
          {$push:{"products":{product:pid, quantity:1}}})
          
          return car
         
          
  }
  catch(error){
    console.error(error);
  }

 }


traeCartBy = async(id) =>
 {

 
  try{
    const result=  await cartModel.findById(id).populate('products.product').lean().exec();
   
    if(result === null)
    { 
      return {
        statusCode:404,
        response:{status:'error', error:'no se encuenta'}
      }
    }
    return {statusCode:200,response:{status:'exito', payload:result}}
}
catch(e){
console.error(e);;
}

   
 }

 BorrarCartProducto = async(id,pid) =>{
      try{
        const result = await cartModel.findByIdAndDelete(id)
     if(result== null){
      return false
     }
     const cart = await cartModel.find().lean().exec()
     return cart
                  
          
      }
      catch(error){
        console.error(error);;
        
      }

 }


modificarCart = async(cid, products) =>{
        try{
          const result= await cartModel.findByIdAndUpdate({_id:cid},{
            $set:products})
                

        }
        catch(error){
          console.error(error);;
        }

 }
}

