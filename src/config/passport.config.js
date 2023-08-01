import passport from "passport";
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const cookieExtractor = req => {
    const token= (req && req.signedCookies) ? req.signedCookies['mysecretjwt'] : null
    return token
}
const inializePassport = () => {

       passport.use('jwt',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:'secret'
       }, async (jwr_payload,done) =>{
        try {
            return done(null, jwr_payload)
        }catch(err){
            return done(err)
        }
       }))
    
}
export default inializePassport