import mongoose from "mongoose"

const TicketModel= mongoose.model('tickets',new mongoose.Schema({
    name:String,
    descripcion:String
    
}))
export default TicketModel