import mongoose from "mongoose";
import Product from '../src/dao/product.mongo.dao.js'
import chai from   "chai"
// usas uno o chai es para comparar los resultados
import {faker} from "@faker-js/faker"

mongoose.connect('mongodb://0.0.0.0:27017/ecommerce')
const expect =chai.expect

describe('testear CHAI product DAO',() =>{
    before(async function () {
        this.productDao= new Product()
        await mongoose.connection.db.dropCollection(products)

    })

    const fakerCode = faker.commerce.product
    const fakerTitle = faker.commerce.productMaterial
    const fakerDescription = faker.commerce.productDescription
    const fakerPrice = faker.commerce.price
    const fakerStock = faker.finance.amount

    it('get debe devolver un arreglo',async function() {
        
        const result = await this.productDao.traeTodo()
       expect(result).to.be.deep.equal([])
        
    })
    it('Dao debe crear productos', async function() {
        const producto ={
            code:fakerCode,
            title: fakerTitle,
            description: fakerDescription,
            price: fakerPrice,
            category: "A",
            stock: fakerStock,
            pstatus:"0"
            }
            
       
        const result = await this.productDao.addProducto(producto)
        expect(result.code).to.deep.equal(producto.code) 
        expect(result.title).to.deep.equal(producto.title) 
        expect(result.description).to.deep.equal(producto.description) 
        expect(result.stock).to.deep.equal(producto.stock) 
    })
})
