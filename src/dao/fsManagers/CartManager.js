//import  fs from 'fs';
import fs from 'fs'


export class CartManager{
  constructor(path,cart){
  //this.cuenta=0
  this.path=path
 
  
  }
  static cart=[];
  

generaIDCarro = () => (this.cart.length === 0) ? 1: this.cart[this.cart.length -1].id +1

traeTodoCart = async () => {
  try{  
     
      this.cart= await fs.promises.readFile(this.path,'utf-8');
     // console.log(typeof this.cart);
       //stringify lo lleva a JSON string
      const datos = JSON.parse(this.cart);
     // console.log(typeof datos);
      return datos; 
  }
  catch (error){
    console.error(error);
  }

}

addCart = async(Carrito)=>{
        
  try{
          this.cart= await this.traeTodoCart(); 
          let Carro= this.cart;
          const id = await this.generaIDCarro(); 
          Carrito = { "id":id, ...Carrito };
          
        Carro.push(Carrito);
        await fs.promises.writeFile(this.path, JSON.stringify(Carro,null,2), (error) => {
          if (error)
          return console.error(error);
            })
            return id  
          
  }
  catch(error){
    console.error(error);
  }

 }


traeCartBy = async(id) =>
 {

 
          const paso= await this.traeTodoCart();
          const cart =  paso.find(item => item.id == id);
         
          if(cart === undefined)
          { 
            return false
          }

        
          return cart;                
          

   
 }

 borrarCart = async(id) =>{
      try{
        let archivo1 =   await this.traeTodoCart();
        
        archivo1 = archivo1.filter(item => item.id !=id);
        await fs.promises.writeFile(this.path,JSON.stringify(archivo1,null,2));
                  
          
      }
      catch(error){
        console.error(error);;
        
      }

 }


modificarCart = async(cid, carrito,product) =>{
        try{
          const productoCar =product;
        
          let archivoTodo =   await this.traeTodoCart();
          let pid=carrito.product[0].product;

          if (pid == productoCar.product[0].product){
            carrito.product[0].quantity += productoCar.product[0].quantity ;
          }else{

            carrito.product.push(productoCar.product)
          }
          
          const cartIndex = archivoTodo.findIndex(item => item.id == cid)       
        
        archivoTodo[cartIndex]={ ...archivoTodo[cartIndex], ...carrito }
          
          
        await  fs.promises.writeFile(this.path,JSON.stringify(archivoTodo,null,2));
            
                

        }
        catch(error){
          console.error(error);;
        }

 }
}

