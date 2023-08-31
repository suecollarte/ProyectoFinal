export default class ProductoRepositorio{
    constructor (dao){
        this.dao = dao
          
    }
    
   traeTodo = async(req) => this.dao.traeTodo(req)

    getAllProducto = async(request,response) => {
        const results=await this.dao.getAllProducto(request,response)
        console.log("sss", this.dao)
        return results
    }
    traeProductsBy = async(_id) => await this.dao.traeProductsBy(_id)
    addProducto = async(data) => await this.dao.addProducto(data)
     ModificarProducto = async(id,data) => this.dao.ModificarProducto(id,data,{returnDocument:'after'})
    //BorrarProducto = async(id) =>await this.dao.findByIdAndDelete(id)
    BorrarProducto = async(id) =>await this.dao.BorrarProducto(id)
}
//controller-repositorio-dao