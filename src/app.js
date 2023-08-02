import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import MongoStore from "connect-mongo"
//import cookieParser from 'cookie-parser'
import session from 'express-session'
//import FileStore from 'session-file-store'

import inializePassport from './config/passport.config.js'



import productoRoute from './routers/producto.router.js'
import cartRoute from './routers/cart.router.js'
import viewRoute from './routers/view.router.js'
import profile from './routers/profile.router.js'
//import jwtRouter from './routers/jwt.router.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import sessionRoute from './routers/session.router.js'
import loginRoute from './routers/login.router.js'




//const MONGOURI = 'mongodb+srv://admin:admin@cluster0.hjgxmmk.mongodb.net/?retryWrites=true&w=majority';
const MONGOURI='mongodb://0.0.0.0:27017'
//'mongodb://localhost:27017'

const MONGODB = 'ecommerce';

const app= express();

//app.use(cookieParser('hola'))
//const fileStore = FileStore(session)




app.use(express.json());
//para poder recibir lo del cliente los json
app.use(express.urlencoded({extended:true}))
//para recibir formularios por donde llegan los datos
// parse application/x-www-form-urlencoded
// parse application/json



// esto es por http
app.get('/', (request,response) =>{
console.log('despliegues')
response.json('Despliegue con /');

})
//para la interfaz
app.use(express.static('./src/public'))

app.engine('handlebars', handlebars.engine({
    defaultLayout:'main',
    layoutDir:'./src/views/layouts',
    partialsDir:'./src/views/partials'
})
)
app.set('views', './src/views')
app.set('view engine', 'handlebars')

inializePassport();

app.use(session({
  store: MongoStore.create({ 
    mongoUrl: MONGOURI, 
    dbName: 'ecommerce',
    mongoOptions:{
      //useNewUrlParse:true,
      useUnifiedTopology:true
      }
    }),
    secret:'hola',
    resave: false,
    saveUninitialized:false
  
 /*  store: new fileStore({
    path:"./sessions"}) */
}))



app.use(passport.initialize())
app.use(passport.session())


app.use('/api/products',productoRoute);
app.use('/api/carts',cartRoute);
app.use('/products',viewRoute);
app.use('/user',profile)
app.use('/login',loginRoute)
app.use('/api/sessions', sessionRoute)
/*app.use('/jwt',jwtRouter)
 app.get('/login', (req, res) => {
  res.render('indexuser')
}) */

//app.use('productos',viewproduct)

//esta es una promesa
// por eso se trabaja asi...
mongoose.set('strictQuery',false);

try{
    //await mongoose.connect(MONGOURI+MONGODB,{
      //  useUnifiedTopology:true})
      mongoose.connect('mongodb://0.0.0.0:27017', { dbName: 'ecommerce' })
     
     const httpServer= app.listen(8080, () => console.log('Server Up!'))

   
    }
catch(err){
    console.log(err.message)
}


    