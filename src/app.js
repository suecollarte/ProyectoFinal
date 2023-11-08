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
import {logger,loggerHttp} from './utils/logger.js'

import productoRoute from './routers/producto.router.js'
import cartRoute from './routers/cart.router.js'
import viewRoute from './routers/view.router.js'
import profile from './routers/profile.router.js'
import ticketRouter from './routers/ticket.router.js'
import userRouter from './routers/user.router.js'

import passport from 'passport'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from "swagger-ui-express"

import sessionRoute from './routers/session.router.js'
import loginRoute from './routers/login.router.js'
import {run} from "./run.js"
import dotenv from 'dotenv'

import paymentsRouter from "./routers/payment.router.js"

//const MONGOURI = 'mongodb+srv://admin:admin@cluster0.hjgxmmk.mongodb.net/?retryWrites=true&w=majority';
//const MONGOURI='mongodb://0.0.0.0:27017'

//export const PORT = process.env.PORT
//const MONGOURI='mongodb://0.0.0.0:27017'
//const MONGOURI="mongodb://localhost:27017"

//'mongodb://localhost:27017'

//const MONGODB = 'ecommerce';
//export const MONGODB=process.env.MONGODB
//export const MONGOURI=process.env.MONGO_URI



const app= express();

//app.use(cookieParser('hola'))
//const fileStore = FileStore(session)




app.use(express.json());
//para poder recibir lo del cliente los json
app.use(express.urlencoded({extended:true}))
//para recibir formularios por donde llegan los datos
// parse application/x-www-form-urlencoded
// parse application/json

app.use(loggerHttp)
logger.info("BDatos",process.env.MONGODB)

//para la interfaz
app.use(express.static(__dirname+'/public'))


app.use(session({
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI, 
    dbName: process.env.MONGODB,
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


app.engine('handlebars', handlebars.engine({
    defaultLayout:'main',
    layoutDir:'./src/views/layouts',
    partialsDir:'./src/views/partials'
})
)
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

const swaggerOptions={
  definition:{
    openapi:'3.0.1',
    info:{
      title:"documentacion API ecommerce",
      description: "ecommerce proyecto",
      version: "1.0.0rs"
    }
  },
  apis: ['./docs/**/*.yaml']
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

// esto es por http
app.get('/loggerTest ', (request,response) =>{
  logger.debug("consulta ruta /")
  logger.http("consulta ruta /")
  logger.info("consulta ruta /")
  response.json({status:"success"});
 
  })
  app.get('/ ', (request,response) =>{
    response.render('session/login')
    })



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
app.use('/api/users', userRouter)
app.use('/api/ticket',ticketRouter)
app.use('/payments', paymentsRouter)
//single solo un archivo
// en el form debe llamarse file


//app.listen(PORT, () => console.log(`Server Up on port ${PORT}`))
mongoose.set('strictQuery',false);

try{
    //await mongoose.connect(MONGOURI+MONGODB,{
      //  useUnifiedTopology:true})
      //mongoose.connect('mongodb://0.0.0.0:27017', { dbName: 'ecommerce' })
  
      //mongoose.connect(MONGOURI, {dbName:MONGODB})
     const httpServer= app.listen(8080, () => {
      logger.debug("debug")
      logger.error("error")
      logger.warning("warning")
      logger.http("http")
      logger.info("info")
      
    })
     const socketServer = new Server(httpServer)
     httpServer.on("error", (e) => logger.error(e) ) //console.log("ERROR: " + e))
     const io = socketServer
     
     run(socketServer, app)
   
    }
catch(err){
  
    logger.fatal(err.message)
}
    