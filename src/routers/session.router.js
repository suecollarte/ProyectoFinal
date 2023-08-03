import { Router } from 'express'
import passport from 'passport'
import {JWT_COOKIE_NAME} from '../utils.js'
const router = Router()


router.get('/github', passport.authenticate('github'
                    ,{scope:['user:email']})
                    , async(req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), async(req,res)=>{
    req.session.user=req.userres.redirect('/')
})


//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('session/register')
})

// API para crear usuarios en la DB
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.redirect('/session/login')
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
    res.cookie(JWT_COOKIE_NAME, req.user.token)
    res.redirect('/products')
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