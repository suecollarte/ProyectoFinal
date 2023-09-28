import { Router } from 'express'
import passport from 'passport'
import {JWT_COOKIE_NAME} from '../utils.js'
import {generateRandomString} from '../utils.js'
import config from '../config/config.js'
import UserModel from "../dao/models/user.model.js"
import UserPasswordModel from '../dao/models/user-password.model.js'

const router = Router()


router.get('/github', passport.authenticate('github'
                    ,{scope:['user:email']})
                    , async(req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), async(req,res)=>{
    req.session.user=req.user
    res.redirect('/')
})

router.get('forget-password', async(req,res) =>{
  const email=req.body.email
  const user = await UserModel.findOne({email})
  if(!user){
    return res.status(404).json({status:"error", error:'Usuario no se encuentra'})

  }
  const token =generateRandomString(16);

  await UserPasswordModel.create({email,token})
  const mailerConfig ={
    service: 'gmail',
    auth:{user:config.nodemailer.user, pass:config.nodemailer.pass}
  }
 let transporter =nodemailer.createTransport(mailerConfig)
 let message={
    from : config.nodemailer.user,
    to: email,
    subjetct:'[Prueba email] Resetear password',
    html: '<h1>Reseteo password http://localhost:8080/reset-password/'+token
}
try{
    await transporter.sendMail(message)
    res.json({status:"success", message:`enviado ${email}`})
}catch (err){
    res.status(500).json({status:"error", error:err.message})
}


})
router.get('/current', (req,res) =>{
    if(!req.session.user) return res.status(401).json({status:'error', error:'sin session detectada!'})
    res.status(200).json({status: 'success',payload: req.session.user})
})

//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('session/register')
})

// API para crear usuarios en la DB
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.redirect('/session/login')
})

// API para crear usuarios en la DB
router.post('/verify-token/:token', async (req, res) => {
const userPassword = await UserPasswordModel.findOne({token:req.params.token})
if(!userPassword){
    return res.status(404).json({status:"error", error:"No valido la confirmacion / expiro el tiempo definido"})
}
const user= userPassword.email
    res.render('/session/reset-password',{user})
})

router.post('/reset-password/:user', async (req, res) => {
    try{
        const user = await UserModel.findOne({email: req.params.user})
        await UserModel.findByIdAndUpdate(user._id, {password: createHash(req.body.newPassword)})
        res.json({status:'success', message:"Se ha creado una nueva contraseña"})
        await UserPasswordModel.deleteOne({email: req.params.user})

    }catch (err){
    res.status(500).json({status:"error", error:err.message})
    }
})

router.get('/failregister', (req, res) => {
    console.log('Fail Strategy');
    res.send({ error: "Failed" })
})

// Vista de Login
router.get('/login', (req, res) => {
    res.render('session/login')
})

// API para login
router.post('/login', passport.authenticate('login', 
{ failureRedirect: '/session/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentiales" })
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        password: req.user.password,
        role: req.user.role
    }
   // console.log(req.session.user)
   console.log(req.user.token)
    //res.cookie(JWT_COOKIE_NAME, req.user.token)
    //res.redirect('/products')
    res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products')
})
router.get('/faillogin', (req, res) => {
    res.send({error: "Fallo Login"})
})

router.get('/profile', (req, res) => {
    res.json(req.session.user)
})

// Cerrar Session
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).render('errors/base', { error: err })
        } else res.redirect('/sessions/login')
    })
})



export default router