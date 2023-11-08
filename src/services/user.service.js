import userModel from "../dao/models/user.model.js"
import {logger } from   "../utils/logger.js"

export default class UserService {
   
    get = async() => await userModel.find()
    create = async(data) => {
        try{
           // console.log("data",data)
            if(!data.email) {throw "debe tener un mail"}
            else{
 
           return await userModel.create(data)}
        }
        catch(err)
        {
            logger.error(err)
            return {}
        }
    }
    getById = async(id) =>await userModel.findById(id)
    
    ModificarUser = async(id,data) => {
        
        try{ 
            return await userModel.updateOne({_id:id},{$set:data})}
        catch(err)
        {
            return {}
        }
    }
    delete = async(id) => await userModel.deleteOne({_id:id})
       
}