//import UserDTO from "../dto/user.dto.js"
import userModel from "../dao/models/user.model.js"

export default class UserRepository {
    constructor(dao){
        this.dao=dao
    }
    get = async() => await this.dao.get()
    create = async(data) => {
        const dataToInsert = new userModel(data)
        await this.dao.create(dataToInsert)
    }
    getById = async(id) => await this.dao.getById(id)
    
    ModificarUser = async(id,data) =>  await userModel.updateOne({_id:id},{$set:data})
    delete = async(id) => await userModel.deleteOne({_id:id})
       
}