import userModel from "./models/user.model.js"

export default class User{

    get = async() => await userModel.find()
    create = async(data) => await userModel.create(data)
    getById = async(id) => await userModel.findById(id)
    updata = async(id,data)=> await userModel.ipdateOne({_id:id}, data)
}