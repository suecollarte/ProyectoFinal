import mongoose from "mongoose";
import Carts from '../src/dao/cart.mongo.dao.js'
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


describe("testeo supertest Method post carts", () =>{
    describe("Productos", () =>{
        it("agregar producto a carrito",async ()=>{
            const result = await requester.post('/carts/64f11dc3b8e59632806329eb').send({
                productId:'64af4ba8a66f90b17c7ccefb',
                quantity: 10
            })
            expect(result.status).to.equal(302) // se redirirge a carts

        })
        it("actualizar", async () =>{
            const result = await requester.put('/carts/64f11e7cc82c072de67a68e3/64af0eac3644db53a543d459').send({
                quantity: 200

            })
            expect(result.status).to.equal(302)
        })
        it("eliminar", async () =>{
            const result = await requester.post('/carts/64f11e7cc82c072de67a68e3/eliminar').send({
                cartId: "64f11e7cc82c072de67a68e3"

            })
            expect(result.status).to.equal(302)
        })


    })

})
