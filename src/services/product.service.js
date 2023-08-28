//import ProductDAO from '../dao/product.mongo.dao.js'
import  ProductDao  from './product.factory.js'
//import productModel from '../models/product.model.js'
// aca esta si trabajo con mongo o filesystem
import ProductoRepositorio from './product.repositorio.js'
// si esta sin llaves esta por default
//import ProductRepositorio from './product.repositorio.js'

//app-routers-controllers-service-repositorio-dao-model
//tb podria ser la vista app-routes-view*controllers

export default class ProductService extends ProductoRepositorio {
    constructor(ProductDao){
        super(ProductDao)
    }
}
//console.log("producto",ProductDao)
//const ProductService = new ProductRepositorio(Product)
//console.log("service",ProductService)
//export default ProductService