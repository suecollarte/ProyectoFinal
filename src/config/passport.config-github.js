import passport from "passport";
import GitHubStrategy from 'passport-github2'
import userService from '../dao/models/user.model.js'



/* const inializePassport = () => {

       passport.serializeUser((user,done) =>{
        done(null,user._id)
       })
       passport.deserializeUser(async (id, done) =>{
        let user =await userService.findById(id)
        done(null,user);
       })
} */

const inializePassport = () =>{
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.e75875cce2ba773c',
        clientSecret:'40e410caf8757019168909c0527ea6612047f99a',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken,refreshToken, profile, done) =>{
        try{
            console.log(profile)
            let user= await userService.findOne({mail:profile._json.email})
            if (!user) {
                let newUser ={
                    first_name:profile._json.name,
                    last_name:'',
                    age:30,
                    email:profile._json.email,
                    password:''
                }
                let result =await userService.create(newUser)
                done(null,result)
            }
            else{
                done(null,result)
            }
        }catch(error){
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

}
export default inializePassport