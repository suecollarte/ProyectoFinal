import productModel from '../dao/models/product.model.js'

export default class ProductMongoDAO{
    traeTodo = async() => await productModel.find().lean().exec()
    
    traeProductsId = async(_id) => await productModel.findById(_id).lean().exec();
    getAllProducto = async(req,res)=> {

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
         
         //const productos =await productModel.find(
       
        const productos =await productModel.paginate(filtroOpciones, paginacionOpciones)
       //console.log("PRODUCTOS")
       // console.log(productos)
       //console.log(productos)
    let prevLink
    if(!req.query.page && page==1){
      prevLink=`http://localhost:8080/api/products?page=${page}`
    }else{
      prevLink =`http://localhost:8080/api/products?page=${productos.prevPage}`
      
    }
    let nextLink
    if(!req.query.page){
      nextLink =`http://localhost:8080/api/products?page=${productos.nextPage}`
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
    addProducto = async(data) => await productModel.save(data)
    addManyProducto = async(data) => await productModel.insertMany(data)
    // actualiza pero devuelve el producto con lo anterior
    //update = async(id,data) => productModel.findByIdAndUpdate(id,data)
    //este te lo devuelve actualizado
    ModificarProducto = async(id,data) => productModel.findByIdAndUpdate(id,data,{returnDocument:'after'})
    BorrarProducto = async(id) =>await productModel.findByIdAndDelete(id)

  }
