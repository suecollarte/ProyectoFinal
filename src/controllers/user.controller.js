import  UserService from "../services/user.service.js";

export default class UserController {
    constructor(){
        this.services = new UserService()
    }


get =async(req,res) =>res.json(await this.services.get())


create = async(req, res) =>{

    const user = req.body
   const xx= await this.services.create(user)
    res.json(await this.services.create(xx))
}
getById = async(req,res) =>{
    const {id}= req.params
    res.json(await this.services.get(id))
}

ModificarUser = async(req,res) =>{
    const {id}= req.params
    const data = req.body
    console.log("modifica controller",data)
    res.json(await this.services.ModificarUser(id,data))

}  
delete = async(req,res) =>{
    const id= req.params.id
    res.json(await this.services.delete(id))
}
}