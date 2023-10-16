import mongoose from "mongoose";
import Product from '../src/dao/product.mongo.dao.js'
import chai from   "chai"
// usas uno o chai es para comparar los resultados

mongoose.connect('mongodb://0.0.0.0:27017')
const assert= Assert.strict

describe('testear product DAO',() =>{
    before(async function () {
        this.productDao= new Product()
        await mongoose.connection.db.dropCollection(products)

    })
    it('get debe devolver un arreglo',async function() {
        
        const result = await this.productDao.traeTodo()
       expect(result).to.be.deep.equal([])
        
    })
    it('Dao debe crear productos', async function() {
        
        const result = await this.productDao.addProducto({
            code:"AAA1234",
            title: "Producto prueba",
            description: "descripcion",
            price: 100,
            category: "A",
            stock: 2000,
            pstatus:"0"
            })
            assert.ok(result._id)
        })

})
