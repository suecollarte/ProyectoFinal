import mongoose from "mongoose";
import Product from '../src/dao/product.mongo.dao.js'
import chai from   "chai"
import supertest from "supertest"
import {fileURLToPath} from "url"
import {dirname,path} from "path"
import {promises as fs} from "fs"
// usas uno o chai es para comparar los resultados

//mongoose.connect('mongodb://0.0.0.0:27017/ecommerce')
const expect =chai.expect
const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)
const requester = supertest('http://localhost:8080')


describe('testear superTest product GET',() =>{
   
    it('get debe devolver un arreglo',async () =>{
        
        const productsData = [
            {
                title: String,


            }
        ]
        Product.traeTodo = async () => productsData;
        const response = await requester.get('/products')
        expect(response.status).to.equal(200);
        const responseBody = response.textexpect(typeof responseBody).to.equal('string')
        
    })

})

describe("testeo supertest Method post productos", () =>{
    describe("Productos", () =>{
        it("end point post registrar producto",async ()=>{
            const filename = "test1.png"

            const mockRequest = {
                file:{filename}
            };
            const imgDirectory = join(_dirname,'img')
            const absolutePath = join(imgDirectory, filename)

            try {
                await fs.access(absolutePath)

            } catch (error){
                throw new Error(`no se encuentra: ${absolutePath}`);
            }

                const response = await requester
                .post('/products')
                .field('title','producto prueba')
                .field('category','categoria prueba')
                .field('price','price prueba')
                .field('code','code prueba')
                .field('stock','stock prueba')
                .attach('thumbnail', absolutePath)

            expect(response.status).to.equal(200)
    


        })

    })

})
