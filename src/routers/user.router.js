import {Router} from "express"
import multer from "multer"
import UserController from '../controllers/user.controller.js'
const controllerUser = new UserController


const router = Router()

const storage =multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'documentos/')
  },
  filename: function (req,file,cb){
    cb(null,file.originalname)
  }
})

const uploader = multer({storage})

router.get('/',controllerUser.get.bind(controllerUser))
router.post('/',controllerUser.create.bind(controllerUser))
//faltaba esto
router.put('/:id', controllerUser.ModificarUser.bind(controllerUser))
router.get('/premium/:uid',controllerUser.getById.bind(controllerUser))
//single solo un archivo
// en el form debe llamarse file

  //single solo un archivo
  // en el form debe llamarse file
router.post('/:uid/upload',uploader.single('file'), (req,res) =>{
    
    if (!req.file){
        return res.status(400).json({status:"error",error:" no hay archivo"})
    }
  
    controllerUser.ModificarUser.bind(controllerUser)(req,{documento: true})
  })
export default router