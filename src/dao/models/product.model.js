import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection ='products'

const productSchema = new mongoose.Schema({   
    code: {type: String, required:true,unique:true},
    title: {type: String, required:true},
    description: {type: String, required:true},
    price: {type: Number, required:true},
    category: {type: String, required:true},
    stock: {type: Number, required:true},
    thumbnails: {type: [String],default:[]},
    pstatus:{type:Boolean, default:true}

})
//mongoose.set("strictQuery",'false')
productSchema.plugin(mongoosePaginate)
const productModel =mongoose.model(productCollection,productSchema)
export default productModel 