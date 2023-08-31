import {Router} from 'express';
import { ProfileManager } from '../dao/fsManagers/ProfileManagerBD.js';
import passport from 'passport'
const router =Router();

const sessionClass = new ProfileManager;


//controller
router.get('/', async (req,res) =>{
  //res.json({status:'success',message:'Cookies'})
   res.render("user")
 
})

//function profile(req,res, next){
router.post('/registra', passport.authenticate('registra',{failureRedirect:'/failregistra'})  ,async(req,res)=>{
  
  /* let nombreUser= req.body.login;

  const user={
        username: nombreUser,
        ui_preference: 'azul',
        language:'es',
        location:'ch'
    }  */
     
   // res.cookie('preference', JSON.stringify(user), {signed:true}).json({status:'success',message:'cookie creada2'})
    //req.session.user = user
 
   //res.json({status:'success',message:'sesion creada2'}) 
  
  //res.status(200).json(nombreUser); //envio de regreso los datos recibidos
  //---------------
  res.send({status:'success', message:'usuario registrado'})
  res.redirect('/api/products/')

  
    
    })

    router.get('/failregistra', async(req,res)=>{
      console.log("fallo estrategia")
      res.send({error:'failed'})
    })
router.get('/getpreference',async (req,res) =>{
  //const preference = JSON.parse(req.signedCookies['preference'])
 // const preference = req.session.user
  //res.send(preference.location)
  res.send(req.session.user.location)
})

router.get('/deletepreference',async (req,res) =>{
  //res.clearCookie('preference').json({status:'success',message:'cookie borrada'})
  req.session.destroy(err =>{
    if (err) return res.json({status:'error', message:'error'})
    return res.json({status:'success', message:'borrada'})
  })
})

    
//eliminacion
router.get('/logout', async (req,res) =>{
  req.session.destroy((err) => {
    res.redirect('/user') // will always fire after session is destroyed
  })
})
export default router