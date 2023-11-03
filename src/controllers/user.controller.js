import { UserService } from "../repositories/index.js";

export const get =async(req,user) =>{
    const users =await UserService.get()
    res.json({users})

}
export const create = async(req, res) =>{

    const user = req.body
    const userNew = await UserService.create(user)
    res.json({user:userNew})
}
export const getById = async(req,res) =>{
    const uid= req.body
    const user = await UsersService.get(uid)
    res.json({user})
}