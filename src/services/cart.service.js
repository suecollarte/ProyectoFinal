//import ProductDAO from '../dao/product.mongo.dao.js'
import { Cart } from '../dao/cart.factory.js'

// si esta sin llaves esta por default
import CartRepositorio from '../repositorio/cart.repositorio.js'
//app-routers-controllers-service-repositorio-dao-model
//tb podria ser la vista app-routes-view*controllers

export const CartService = new CartRepositorio(Product)