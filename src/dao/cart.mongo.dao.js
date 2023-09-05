import cartModel from '../models/cart.model.js'


export default class CartMongoDAO{
  addCart = async(data) => await Carro.save().catch(err=>err); 
  
    traeTodo = async() => await cartModel.find().lean().exec()
    
    traeCartBy = async(id) => await cartModel.findById(id).lean().exec();
    getAllPaginacion = async(req,PORT)=>{

        let page= parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
          
        const filtroOpciones ={}
        if(req.query.stock) filtroOpciones.stock = req.query.stock
        if (req.query.category) filtroOpciones.category= req.query.category
      
        const paginacionOpciones= {lean:true,limit:limit,page:page}
        //sort
        if (req.query.sort == "asc") paginacionOpciones.sort ={ price:1}
        if (req.query.sort == "desc") paginacionOpciones.sort ={ price: -1}
        try{
         
           
        const carros =await cartModel.paginate(filtroOpciones, paginacionOpciones)
    let prevLink
    if(!req.query.page && page==1){
      prevLink=`http://localhost:8080/api/products?page=${page}`
    }else{
      prevLink =`http://localhost:8080/api/products?page=${carros.prevPage}`
      
    }
    let nextLink
    if(!req.query.page){
      nextLink =`http://localhost:8080/api/products?page=${carros.nextPage}`
    }else{
      nextLink=`http://localhost:8080/api/products?page=${page}`
    }
 
    const totalPag=[]

          return {
            statusCode:200,
            response:productos
          }
        }
        catch (err) {
          return{
            statusCode:500,
            response:{status:err, error:err.message}
          }
          
        }  
    }
    addCartProd = async(cid,pid) => {       
      //let car = await cartModel.find(cid);
    // console.log("wwww")
       let car= await cartModel.updateOne({_id:cid},
        {$push:{"products":{product:pid, quantity:1}}})
        
        return car
       
        
}
    // actualiza pero devuelve el producto con lo anterior
    //update = async(id,data) => cartModel.findByIdAndUpdate(id,data)
    //este te lo devuelve actualizado
    modificarCart = async(id,data) => cartModel.findByIdAndUpdate(id,data,{returnDocument:'after'})
    BorrarCartProducto = async(_id,pid) =>await cartModel.findByIdAndDelete(_id)

  }
