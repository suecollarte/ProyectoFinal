import chai from "chai"
import supertest from "supertest"

const expect = chai.expect
const requester =supertest('http://localhost:8080')

describe('testing supertest', () =>{
    describe("test carrito ",() =>{
        it('endpoint /api/product registrar producto', async () =>{

  const product={
    title:"hola",
    code:"qqq12345er",
    description:"blabla",
    price:1000,
    stock:200,
    category:"AA"
  }
  console.log(product)
  const response = await requester.post('/api/products').send(product)
  const {status,ok, _body} =response
  expect(_body.payload).to.have.property('_id')
        })
  

    it("endpoint post no vacio",async () =>{

        const product={}
        const response = await requester.post('/api/products').send(product)
        const {status,ok, _body} =response
        expect(ok).to.be.eq(false)
              })
          })
})


