import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import mockRouter from './routers/prodmock.router.js'
import MongoStore from "connect-mongo"
import { Server } from "socket.io";
//import cookieParser from 'cookie-parser'
import session from 'express-session'
//import FileStore from 'session-file-store'

import inializePassport from './config/passport.config.js'
import __dirname from "./utils.js"
import {logger} from '../src/utils/logger.js'

import productoRoute from './routers/producto.router.js'
import cartRoute from './routers/cart.router.js'
import viewRoute from './routers/view.router.js'
import profile from './routers/profile.router.js'

import passport from 'passport'

import sessionRoute from './routers/session.router.js'
import loginRoute from './routers/login.router.js'
import {run} from "./run.js"
 


//const MONGOURI = 'mongodb+srv://admin:admin@cluster0.hjgxmmk.mongodb.net/?retryWrites=true&w=majority';
//const MONGOURI='mongodb://0.0.0.0:27017'

//export const PORT = process.env.PORT
const MONGOURI='mongodb://0.0.0.0:27017'
//'mongodb://localhost:27017'

const MONGODB = 'ecommerce';
//export const MONGODB=process.env.MONGODB
//export const MONGOURI=process.env.MONGO_URI
 console.log("BD",MONGODB)
const app= express();

//app.use(cookieParser('hola'))
//const fileStore = FileStore(session)




app.use(express.json());
//para poder recibir lo del cliente los json
app.use(express.urlencoded({extended:true}))
//para recibir formularios por donde llegan los datos
// parse application/x-www-form-urlencoded
// parse application/json




//para la interfaz
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine({
    defaultLayout:'main',
    layoutDir:'./src/views/layouts',
    partialsDir:'./src/views/partials'
})
)
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

// esto es por http
app.get('/logger', (request,response) =>{
  logger.debug("consulta ruta /")
  logger.http("consulta ruta /")
  logger.info("consulta ruta /")
  //response.json({status:"success"});
  response.render('session/login')
  })

  app.use(session({
    store: MongoStore.create({ 
      mongoUrl: MONGOURI, 
      dbName: MONGODB,
      mongoOptions:{
        //useNewUrlParse:true,
        useUnifiedTopology:true
        }
      }),
      secret:'hola',
      resave: true,
      saveUninitialized:true
    
   /*  store: new fileStore({
      path:"./sessions"}) */
  }))

inializePassport();
app.use(passport.initialize())
app.use(passport.session())


app.use('/api/products',productoRoute);
app.use('/api/carts',cartRoute);
app.use('/products',viewRoute);
app.use('/user',profile)
app.use('/login',loginRoute)
app.use('/session', sessionRoute)
app.use('/mockingproducts', mockRouter)

//app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))
mongoose.set('strictQuery',false);

try{
    //await mongoose.connect(MONGOURI+MONGODB,{
      //  useUnifiedTopology:true})
      mongoose.connect('mongodb://0.0.0.0:27017', { dbName: 'ecommerce' })
  

     const httpServer= app.listen(8080, () => {
      logger.debug("Server Up!")
      logger.error("Server Up!")
      logger.warn("Server Up!")
  logger.http("Server Up!")
  logger.info("Server Up!")
      console.log('Server Up!')})
     const socketServer = new Server(httpServer)
     httpServer.on("error", (e) => console.log("ERROR: " + e))
     const io = socketServer
     
     run(socketServer, app)
   
    }
catch(err){
    console.log(err.message)
}
    