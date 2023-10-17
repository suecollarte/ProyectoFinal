import chai from   "chai"
import supertest from "supertest"
import {faker} from "@faker-js/faker"

// usas uno o chai es para comparar los resultados

const expect =chai.expect
const requester = supertest('http://localhost:8080')


describe('testear superTest SESSION',() =>{
    const fakerName = faker.internet.userName()
    const fakerLastName = faker.internet.userName()
    const fakerEmail = faker.internet.email()
    const randomNumber = Math.floor(Math.random() = Math.pow(10,10))

    describe('Test sessiones',() =>{

        it('registro usuario', async function (){
            this.timeout(5000)
            const user ={
                first_name: fakerName,
                last_name:fakerLastName,
                email:fakerEmail,
                age:30,
                password:"secret",
                active: false,
                cart: null

                
            }
            try {
                const response = (await requester.post("/session")).send(user)
                expect(response.status).to.equal(302)
            } catch (error){
                throw error;

            }
        })

        it("debe login un usuario y devolver cooki", async ()=>{
            const result = await requester.post("/login").send({
                email: fakerEmail,
                password: "secret"
            })
            const cookieResult= result.header['set-cookie'][0]
            expect(cookieResult).to.be.ok
            expect(cookieResult.split('=')[0]).to.be.eql("CookieToken")
            expect(cookieResult.split('=')[1]).to.be.ok
        })
    })
})
