import {Router} from 'express';
import { ProfileManager } from '../dao/fsManagers/ProfileManagerBD.js';

const router =Router();

const sessionClass = new ProfileManager;


//controller
router.get('/', async (req,res) =>{
  //res.json({status:'success',message:'Cookies'})
  res.render("user",{status:'success'})
 
})

router.get('/profile/:cid',(req,res)=>{
  let nombreUser= req.params.cid;

  const user={
        username: nombreUser,
        ui_preference: 'azul',
        language:'es',
        location:'ch'
    } 
    console.log('usuario',user)
   // res.cookie('preference', JSON.stringify(user), {signed:true}).json({status:'success',message:'cookie creada2'})
    req.session.user =user
   //return user
   res.json({status:'success',message:'sesion creada2'}) 
   console.log('termino')
   //res.status(200).json(nombreUser); //envio de regreso los datos recibidos
    //res.redirect('/api/products/')
    
    
    })

router.get('/getpreference', (req,res) =>{
  //const preference = JSON.parse(req.signedCookies['preference'])
 // const preference = req.session.user
  //res.send(preference.location)
  res.send(req.session.user.location)
})

router.get('/deletepreference', (req,res) =>{
  //res.clearCookie('preference').json({status:'success',message:'cookie borrada'})
  req.session.destroy(err =>{
    if (err) return res.json({status:'error', message:'error'})
    return res.json({status:'success', message:'borrada'})
  })
})

router.post('/', async (req,res) =>{
    try{
      
        const result = await sessionClass.addCart(req,res);
        res.status(201).json({status:'success',payload:result})
    }catch (err){

      res.status(500).json({ status:'error', error:err.message})
    }
    
     
   
  })  
    
//actualizacion
router.put('/:id_session', async (request,response) =>{
  try{
          const id = request.params.cid;
          const data= request.body;
          await cartClass.modificarSession(id_session, data)
          response.status(201).json({message: 'Actualizado',id_session})
      }catch (e) {
        console.error(e)
      }   
    
})


//eliminacion
router.post('/borra/:id_session', async (request,response) =>{
  const id_session= request.params.id_session;  
 

  try{
   const result= cartClass.BorrarSession(id_session);
    if(result== null){
      response.status(404).send({message: 'No se encuentra',id_session})
    }
    response.status(200).json({status: 'Exito Borrado',id_session})  
   
  }
  catch (err) {
    //console.error(e)
    response.status(500).json({status:'error', error: err.message})
  }  

  
  //response.status(201).json({message: 'Producto Borrado',id})
  
})
export default router