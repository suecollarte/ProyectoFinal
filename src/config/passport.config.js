import passport from "passport";
import GitHubStartegy from 'passport-github2'



const inializePassport = () => {

       passport.serializeUser((user,done) =>{
        done(null,user._id)
       })
       passport.deserializeUser(async (id, done) =>{
        let user =await userService.findById(id)
        done(null,user);
       })
}
export default inializePassport