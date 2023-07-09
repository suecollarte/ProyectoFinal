import { cartModel } from '../models/cart.model.js';
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

addCart = async(CarritoProd)=>{
        
  try{       
        const cars = await productModel.aggregate(
          //concatenas
          [
          {$match:{code:CarritoProd[0].code}},
          {$group:{
            product:'$code',
            price:'$price',
            quantity:CarritoProd[0].quantity
          }
          },
          {
            $group:{
              _id:1,
              products:{$push:"$$ROOT"}
            }
          },
          //operaciones en otra collection
          {
            $project:{
              _id:0,
              cars:"$cars"
            }
          },
          {
            //reportes
            $merge:{into:'reportescarts'}
          }
          ])
          
          
        //const result = await cars.save();
          
  }
  catch(error){
    console.error(error);
  }

 }


traeCartBy = async(id) =>
 {

 
  try{
    const carts=  await cartModel.findById(id).lean().exec();
   
    if(cart === null)
    { 
      return false
    }
    else
    { 
    return cart;
    }
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

