import passport from "passport";
import local from 'passport-local'
import userService from '../model/profile.models.js'
import {createHash, isValidPassword} from '../utils.js'

const LocalStategy = local.Strategy;
const inializePassport = () =>{


    passport.use('register', new LocalStategy(

        {passReqToCall:true, usernameField:'email'}, async (req,username,password,done) =>{
            const {first_name, last_name, email,age} =req.body
            try{
                let user=await userService.findOne({email:username})
                if(user){
                    console.log('existe usuario')
                    return done(null,false)

                }
                const newUser ={
                    firstname,last_name,email,age,password:createHash(password)
                }
                let result = await userService.create(newUser)
                return done(null,result)

            }catch (error){
                return done("error al obtener usuario:"+error)
            }
        }
    ))
}
export default inializePassport