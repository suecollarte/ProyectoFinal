import userModel from "./models/user.model.js"

export default class User {

    get = async() => await userModel.find()
    create = async(data) => {
        try {await userModel.create(data)
        }catch(err){
            return {}
        }

     }
    getById = async(id) => await userModel.findById(id)
    update = async(id,data)=> await userModel.updateOne({_id:id}, {$set: data})
    delete = async(id) => await userModel.deleteOne({ id: id})
    
}