//import ProductDAO from '../dao/product.mongo.dao.js'
import { Product } from '../dao/product.factory.js'

// si esta sin llaves esta por default
import ProductRepositorio from '../repositorio/product.repositorio.js'
//app-routers-controllers-service-repositorio-dao-model
//tb podria ser la vista app-routes-view*controllers

export const ProductService = new ProductRepositorio(Product)