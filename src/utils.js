import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const JWT_PRIVATE_KEY ="hola"
export const JWT_COOKIE_NAME = "coderCookieToken"
export default __dirname

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}



export const generateToken = user => {
    const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: '24h' })
    return token
}
//extraer desde coookie
export const extractCookie = req =>{
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME]: null
}

///middleware

export const passportCall = strategy =>{
    return async(req,res,next) =>{
        passport.authenticate(strategy, function(err,user,info){

            console.log("user")
            if(err) return next(err)
            if(!user) return res.status(401).render('errors/base', {error:info.messages ? info.messages : info.toString()})

            req.user = user
            next()
        })(req, res, next)
    }
}