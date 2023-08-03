//estructura del documento que se guardara
//esquema
//schema
import mongoose from "mongoose"

const messageCollection ='users'

const userSchema = new mongoose.Schema({
    
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    age:{type:String, required:true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    cart: {
        type:[{
        _id:false,
            cart: {
                type:mongoose.Schema.Types.ObjectId,
            ref:"carts"
            }
        }]},
    role:{type:String, required:true}
})

const userModel =mongoose.model(messageCollection,userSchema)
export default userModel