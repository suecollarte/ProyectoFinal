export default class ProductoRepositorio{
    constructor (dao){
        this.dao = dao
    
       
    }
    traeTodo = async(req) => this.dao.traeTodo(req)

    getAllPaginacion = async(params) => {
        return this.dao.getAllPaginacion(params,this.model)
    }
    traeProductsBy = async(_id) => await this.dao.traeProductsBy(_id)
    addProducto = async(data) => await this.dao.addProducto(data)
    // actualiza pero devuelve el producto con lo anterior
    //update = async(id,data) => this.dao.findByIdAndUpdate(id,data)
    //este te lo devuelve actualizado
    //ModificarProducto = async(id,data) => this.dao.findByIdAndUpdate(id,data,{returnDocument:'after'})
    ModificarProducto = async(id,data) => this.dao.ModificarProducto(id,data,{returnDocument:'after'})
    //BorrarProducto = async(id) =>await this.dao.findByIdAndDelete(id)
    BorrarProducto = async(id) =>await this.dao.BorrarProducto(id)
}
//controller-repositorio-dao