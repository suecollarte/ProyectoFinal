//estructura del documento que se guardara
//esquema
//schema
import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";

const profileCollection ='profile'

const profileSchema = new mongoose.Schema({
  
    session: {type: String, required:true,unique:true},
    mail: {type: String, required:true},
    contrasena:{type: String, required:true},
    rol:{type: String, required:true}
    

})
profileSchema.plugin(mongoosePaginate)
const profileModel =mongoose.model(profileCollection,profileSchema)
export default profileModel 
/*  id:Number,
    idproduct:mongoose.ObjectId, */