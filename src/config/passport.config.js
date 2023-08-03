import passport from "passport";
import local from 'passport-local';
import passport_jwt from "passport-jwt";
import userService from '../dao/models/user.model.js'
import {createHash, extractCookie, generateToken, isValidPassword, JWT_PRIVATE_KEY} from '../utils.js'

const LocalStrategy = local.Strategy;
const JWTStrategy = passport_jwt.Strategy
const ExtractJWT = passport_jwt.ExtractJwt

const inializePassport = () =>{


    passport.use('register', new LocalStrategy(

        {passReqToCallback:true, usernameField:'email'}, 
            async (req,username,password,done) =>{
            const {first_name, last_name, email,age} =req.body
            try{
                let user=await userService.findOne({email:username})
                if(user){
                    console.log('existe usuario')
                    return done(null,false)

                }
                const newUser ={
                    first_name,last_name,email,age,password:createHash(password)
                }
                let result = await userService.create(newUser)
                return done(null,result)

            }catch (error){
                return done("error al obtener usuario:"+error)
            }
        }
    ))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userService.findOne({email: username})
            if(!user) {
                console.log("User dont exist");
                return done(null, user)
            }

            if(!isValidPassword(user, password)) return done(null, false)
            const token =generateToken(user)
            user.token = token

            return done(null, user)
        } catch (error) {
            
        }
    }))

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey:   JWT_PRIVATE_KEY
    }, async(jwt_payload, done) =>{
        done(null,jwt_payload)
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userService.findById(id)
        done(null, user)
    })

}
export default inializePassport