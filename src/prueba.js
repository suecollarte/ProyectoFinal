import mongoose from "mongoose"
import userModel from "./dao/models/user.model.js"

const uri = 'mongodb://localhost:27017'

try {
    //top-level await 
    mongoose.connect('mongodb://0.0.0.0:27017', { dbName: 'ecommerce' })
    app.listen(8080, () => console.log('Server Up!'))
    const result=await userModel.find()
    concole.log(result)

} catch(err) {
    console.log(err.message)
}
