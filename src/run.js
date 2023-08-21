import productRouter from "./routers/producto.router.js"
import cartRouter from "./routers/cart.router.js"
import chatRouter from "./routers/chat.router.js"
import messagesModel from "./models/message.model.js";
import productViewsRouter from './routers/view.router.js'
import sessionRouter from './routers/session.router.js'
import {passportCall} from "./utils.js"

export const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    app.use("/products", passportCall('jwt'),productViewsRouter)
    app.use("/session", sessionRouter)


    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/chat", chatRouter)


    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", async data => {
        await messagesModel.create(data)
        let messages = await messagesModel.find().lean().exec()
        socketServer.emit("logs", messages)
        })
    })

    app.use("/", (req, res) => res.send("HOME"))

}

export default run