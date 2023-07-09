//estructura del documento que se guardara
//esquema
//schema
import mongoose from "mongoose"

const cartCollection ='cart'

const cartSchema = new mongoose.Schema({
    
    id:Number,
    idCliente:Number,
    products:{type:[{
        _id:false,
            product: mongoose.ObjectId,
            quantity:Number
        }],default:[]}
})

export const cartModel =mongoose.model(cartCollection,cartSchema)