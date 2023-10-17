import mongoose from "mongoose";
//import Product from '../src/dao/product.mongo.dao.js'
import ProductMongoDAO from "../src/dao/product.mongo.dao.js";
import Assert from 'assert'
// usas uno o chai es para comparar los resultados

mongoose.connect('mongodb://0.0.0.0:27017/ecommerce')
const assert= Assert.strict

describe('testear product DAO con ASSERT',() =>{
    before(async function() {
        try{
            
            await mongoose.connection.collections.Product.drop()
        } catch (err) {}
        this.productDao= new ProductMongoDAO()
      //  

    })
    beforeEach(async function() {
       try{
            await mongoose.connection.collections.products.drop()

       } catch(err) {}

    })
    it('get debe devolver un arreglo',async function() {
        
        const result = await this.productDao.traeTodo()
         
        assert.strictEqual(Array.isArray(result), true)
        
    })
    it('get debe devolver un arreglo',async function() {
        
        const result = await this.productDao.traeTodo()
         
        assert.strictEqual(result.lenght, 0)
        
    })
})
describe("testeo SAVE metodo producto addProducto", ()=>{
    before(async function() {
        try{
            await mongoose.connection.collections.products.drop()

       } catch(err) {}

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
        it("dao buscar por codigo", async function(){
            const result = await this.productDao.addProducto({
                code:"AAA12345",
                title: "Producto prueba",
                description: "descripcion",
                price: 100,
                category: "A",
                stock: 2000,
                pstatus:"0"
                })
                const product= await this.productDao.traeProductsId({code: "AAA1234"})
                assert.strictEqual(typeof product, 'object')
        }) 

})
