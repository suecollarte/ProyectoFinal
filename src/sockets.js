import messageModel from "./dao/models/message.model"
import logger from './utils/logger.js'

export default (io) =>{
  logger.info("cliente nuevo")
  socket.on('productLista', data =>{
    io.emit('updateProducts',data)

  })
  socket.broadcast.emit('alerta')
  //let messages = await messageModel.find().lean().exec()
  
socket.emit("logs", messages)
socket.on("message", async data =>{
    await messageModel.create(data)
    let messages = await messageModel.find().lean().exec()
    io.emit("logs",messages)

})
}