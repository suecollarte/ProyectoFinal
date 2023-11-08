import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()

const stripe= new Stripe(process.env.STRIPE_PRIVATE_KEY)
export const createSession = async (req,res)=>{
   const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    product_data: {
                        name:"Laptop",
                        description:'Gamming Laptop'
                    },
                    currency: "usd",
                    unit_amount:1999099 // 1990.99

                },
                quantity: 1,
            },
            {
                price_data:{
                    product_data: {
                        name:"carrito helado",
                        description:'Gamming carrito'
                    },
                    currency: "usd",
                    unit_amount:2999099 // 2990.99

                },
                quantity: 2
            }
        ],
        mode: "payment",
        success_url :'http://localhost:8080/payments/exito',
        cancel_url :'http://localhost:8080/payments/cancel',


    })
    return res.json(session)

}