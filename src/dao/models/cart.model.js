//estructura del documento que se guardara
//esquema
//schema
import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";


const cartCollection ='carts'

const cartSchema = new mongoose.Schema({
    
    idCliente:{type:Number, default:0},
    products:{
        type:[{
        _id:false,
            product: {
                type:mongoose.Schema.Types.ObjectId,
            ref:"products"
            },
            quantity:Number
        }],
        default:[]}
})

cartSchema.plugin(mongoosePaginate)
const cartModel =mongoose.model(cartCollection,cartSchema)
export default cartModel 