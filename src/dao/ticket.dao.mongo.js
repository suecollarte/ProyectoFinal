import ticketModel from "./models/ticket.model.js"

export default class Ticket{

    get = async() => await ticketModel.find()
    create = async(data) => await ticketModel.create(data)
    getById = async(id) => await ticketModel.findById(id)
    updata = async(id,data)=> await ticketModel.updateOne({_id:id}, data)

}