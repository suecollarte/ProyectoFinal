import { Router } from 'express'
import { generateToken, authToken } from '../utils.js'
import passport from 'passport'
import logger from '../utils/logger.js'
const router = Router()

const users = [
    { email: 'admin@gmail.com', password: 'secret', rol: 'admin'},
    { email: 'user@gmail.com', password: 'secret', rol: 'user'},
]

router.post('/register', (req, res) => {
    const user = req.body
    if (users.find(item => item.email === user.email)) {
        return res.status(400).json({ status: 'error', error: 'User already exists' })
    }
    users.push(user)
    const access_token = generateToken(user)
    res.json({ status: 'sucess', access_token })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find(item => item.email === email && item.password === password)
    if (!user) return res.status(400).json({ status: 'error', error: 'Invalid credentials' })
    const access_token = generateToken(user)
    // res.json({ status: 'sucess', access_token })
    res.cookie('mysecretjwt', access_token, { signed: true }).json({ status: 'sucsess', access_token })
})

router.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
    logger.info(req.user)
    if (req.user.user.rol === 'admin') return res.json({ status: 'success', payload: req.user.user })
    return res.json({ status: 'error', error: 'No tienes los permisos para ver esta sección' })
})

export default router