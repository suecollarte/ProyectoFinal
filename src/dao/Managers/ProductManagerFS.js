//import  fs from 'fs';
import fs from 'fs'
import logger from '../../utils/logger.js'

export class ProductManager{
  constructor(path,producto){
  //this.cuenta=0
  this.path=path
 
  
  }
  static producto=[]

generaID = () => (this.producto.length === 0) ? 1: this.producto[this.producto.length -1].id +1

traeTodo = async () => {
  
      this.producto= await fs.promises.readFile(this.path,'utf-8');
      const datos = JSON.parse(this.producto);
      return datos; 
 
}


encuentraCodigo = async(Codigo,id) =>{
  //const todo= this.producto;
 
      if (id >1)
      {
          const p1= await this.producto.find(element => element.code === Codigo );
          if(p1 != undefined)
          {
            return false
          }
          
      }
      return true


}

addProducto = async(product)=>{
        
  try{
          let Codigo=product['code'];
          this.producto= await this.traeTodo(); 
          
          let id =  this.generaID(); 
         
          if (this.encuentraCodigo(Codigo,id))
          {
          product['id']=id;
         
          this.producto.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(this.producto), (error) => {
              if (error)
                return console.error(e);
            }); 
          }
  }
  catch(error){
    console.error(e);
  }

 }


traeProductsBy = async(id) =>
 {

      try{
          const paso= await this.traeTodo();
          const producto =  paso.find((item) => item.id == id);
         
          if(producto === undefined)
          { 
            return false
          }
          else
          { 
          return producto;
          }
          
          

    }
    catch(error){
      console.error(e);;
    }
 }

 BorrarProducto = async(id) =>{
 
    let archivo1 =   await this.traeTodo();
    
    archivo1 = archivo1.filter(item => item.id !=id);
    await fs.promises.writeFile(this.path,JSON.stringify(archivo1,null,2), (error) => {
      if (error)
        return console.error(e);
    }); 
    


 }

ModificarProducto = async(id,data) =>{


    let archivo= await this.traeTodo(); 
    const prodIndex = archivo.findIndex(item => item.code == id)
    archivo[prodIndex]={ ...archivo[prodIndex], ...data }
    await  fs.promises.writeFile(this.path,JSON.stringify(archivo,null,2), (error) => {
      if (error)
        return console.error(error);
    }); 
      
  
 }
}

