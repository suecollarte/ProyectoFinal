import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'


import productoRoute from './routers/producto.router.js'
import cartRoute from './routers/cart.router.js'

import {Server} from 'socket.io'




//const MONGOURI = 'mongodb+srv://admin:admin@cluster0.hjgxmmk.mongodb.net/?retryWrites=true&w=majority';
const MONGOURI='mongodb://localhost:27017'
const MONGODB = 'ecommerce';
//const MONGODB='';
const app= express();
app.use(express.json());
//para poder recibir lo del cliente los json
app.use(express.urlencoded({extended:true}))
//para recibir formularios por donde llegan los datos

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



app.use('/api/products',productoRoute);
app.use('/api/carts',cartRoute);

//app.use('productos',viewproduct)

//esta es una promesa
// por eso se trabaja asi...
mongoose.set('strictQuery',false);

try{
    //await mongoose.connect(MONGOURI+MONGODB,{
      //  useUnifiedTopology:true})
      mongoose.connect('mongodb://0.0.0.0:27017', { dbName: 'ecommerce' })
      const httpServer= app.listen(8080, () => console.log('Server Up!'))
      const io = new Server(httpServer)
      io.on('connection',(socket) =>{
        //console.log("conexion realizada",socket.id)
        socket.on('message-desde', data =>{
           // console.log(data)
            log.push({id: socket.id, message:data})
            socket.emit('history',log)
        })
        socket.on("client-addProducto", (producto)=>{ //trae del cliente
            productos.addProducto(producto)
          //enviar listado a todos
          //console.log(productos)
            io.sockets.emit('listaProducto',productos)  //lista
        })
        socket.on("client-borraProducto", (codigo)=>{ //trae codigo del cliente
            
          //enviar listado a todos
            console.log(codigo)
            productos.BorrarProducto(codigo)
            io.sockets.emit('listaProducto',productos)  //lista
        })  
       // socket.emit('listaProducto',todo) //lista todo
        //recibo 
        socket.on('message-desde', data =>{
            // console.log(data)
             log.push({id: socket.id, message:data})
             socket.emit('history',log)
         })
       
    })
    }
catch(err){
    console.log(err.message)
}
