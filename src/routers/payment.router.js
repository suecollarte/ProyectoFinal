import {Router} from "express"
import { createSession } from "../controllers/payments.controller.js"

const router = Router()

router.get('/create-checkout-sesion', createSession)

router.get("/exito", (req, res) => res.send("exito"))
router.get("/cancel", (req,res) => res.send("cancel"))

export default router
