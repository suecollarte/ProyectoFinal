import { Router } from 'express'

const router = Router()


router.get('/', async(req,res)=>{
    console.log("hola")
    res.render('loginuser')
})
export default router