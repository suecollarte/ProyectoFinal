import productRouter from "./routers/producto.router.js"
import cartRouter from "./routers/cart.router.js"
import chatRouter from "./routers/chat.router.js"
import messagesModel from "./dao/models/message.model.js";
import productViewsRouter from './routers/view.router.js'
import sessionRouter from './routers/session.router.js'
import {passportCall, handlePolicies} from "./utils.js"
import logger from './utils/logger.js'
export const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })
//se usa esta estrategia jwt hace referencia contenido jwt
    app.use("/products", passportCall('jwt'), handlePolicies(['ADMIN','USER']),productViewsRouter)
    app.use("/session", sessionRouter)


    app.use("/api/products", passportCall('jwt'),productRouter)
    app.use("/api/carts", passportCall('jwt'),cartRouter)
    app.use("/api/chat", passportCall('jwt'),chatRouter)


    socketServer.on("connection", socket => {
        logger.info("New client connected")
        socket.on('productLista', data =>{
            io.emit('updateProducts',data)
        
          })
        socket.broadcast.emit('alerta')
        socket.on("message", async data => {
        await messagesModel.create(data)
        let messages = await messagesModel.find().lean().exec()
        socketServer.emit("logs", messages)
        })
    })

   app.use("/", (req, res) => res.send("INICIO"))

}

export default run