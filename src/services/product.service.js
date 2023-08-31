//import ProductDao from "./product.factory.js"
import ProductMongoDAO from "../dao/product.mongo.dao.js"
import productModel from "../dao/models/product.model.js"
// aca esta si trabajo con mongo o filesystem
//import ProductoRepositorio from './product.repositorio.js';
// si esta sin llaves esta por default
//app-routers-controllers-service-repositorio-dao-model
//tb podria ser la vista app-routes-view*controllers

//console.log("producto-repositorio",ProductoRepositorio)


export default class ProductoRepositorio{
    constructor (){
        this.dao = new ProductMongoDAO(productModel)
          
    }
    
   traeTodo = async(req) => this.dao.traeTodo(req)

    getAllProducto = async(request,response) => {
        const results=await this.dao.getAllProducto(request,response)
       //console.log("sss", this.dao)
        return results
    }
    traeProductsBy = async(_id) => await this.dao.traeProductsBy(_id)
    addProducto = async(data) => await this.dao.addProducto(data)
     ModificarProducto = async(id,data) => this.dao.ModificarProducto(id,data,{returnDocument:'after'})
    //BorrarProducto = async(id) =>await this.dao.findByIdAndDelete(id)
    BorrarProducto = async(id) =>await this.dao.BorrarProducto(id)
}
/* const ProductService = new ProductoRepositorio(ProductMongoDAO)
const xx= ProductService.getAllProducto()
console.log("servicio-",xx)
export default ProductService */