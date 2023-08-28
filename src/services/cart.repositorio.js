export default class CartRepositorio{
    constructor (dao){
        this.dao = dao
    }
    traeTodo = async() => this.dao.traeTodo()

    getAllPaginacion = async(req,PORT) => await this.dao.getAllPaginacion(req,PORT)
    traeCartBy = async(id) => await this.dao.traeProductsBy(id)
    addCartProd = async(cid,pid) => await this.dao.addProducto(cid,pid)
    // actualiza pero devuelve el producto con lo anterior
    //update = async(id,data) => this.dao.findByIdAndUpdate(id,data)
    //este te lo devuelve actualizado
    //ModificarProducto = async(id,data) => this.dao.findByIdAndUpdate(id,data,{returnDocument:'after'})
    modificarCart = async(id,data) => this.dao.ModificarProducto(id,data,{returnDocument:'after'})
    //BorrarProducto = async(id) =>await this.dao.findByIdAndDelete(id)
    BorrarCartProducto = async(id) =>await this.dao.BorrarProducto(id)
}
//controller-repositorio-dao