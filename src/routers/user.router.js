import {Router} from "express"
import multer from "multer"
import {get, create,getById, ModificarUser} from '../controllers/user.controller.js'

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

router.get('/',get)
router.post('/',create)
router.get('/premium/:uid',getById)
//single solo un archivo
// en el form debe llamarse file

  //single solo un archivo
  // en el form debe llamarse file
router.post('/:uid/upload',uploader.single('file'), (req,res) =>{
    
    if (!req.file){
        return res.status(400).json({status:"error",error:" no hay archivo"})
    }
    const responde=  ModificarUser(req.params.uid,"modificado")
    res.json({status:"success",message:" archivo subido"})
  })
export default router