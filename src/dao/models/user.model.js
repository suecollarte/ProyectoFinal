//estructura del documento que se guardara
//esquema
//schema
import mongoose from "mongoose"

const messageCollection ='users'

const userSchema = new mongoose.Schema({
    
    first_name:{type:String},
    last_name:{type:String},
    age:{type:String},
    email:{type:String},
    password: {type:String},
    documents:{
        type:[
            {
                name: String,
                document:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'documento'}
            }]
    },
    tickets:{
        type:[
            {
            type:mongoose.Schema.Types.ObjectId,
        ref:'tickets'
            }]
    },
    cart: {
        type:[{
        _id:false,
            cart: {
                type:mongoose.Schema.Types.ObjectId,
            ref:"carts"
            }
        }]},
    role:{type:String, default:'user'}
})
mongoose.set("strictQuery",false)
const userModel =mongoose.model(messageCollection,userSchema)
export default userModel