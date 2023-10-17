import {CartService} from "../services/cart.service.js";



export const getAllCart = async (req,res) =>{

    const result = await CartService.getAllPaginacion(req,res)  
    res.json(result) 
   
}

export const traeTodo =  async () =>{

    const result = await CartService.traeTodo()  
    res.json(result) 
   
}
export const traeCartBy =  async (id) =>{

    const result = await CartService.traeCartBy()  
    res.json(result) 
   
}
export const  addCartProd = async(cid,pid) => {  

    const result = await CartService.addCartProd(cid,pid)  
    res.json(result) 
   
}

export const modificarCart = async(id,data)=> {  

    const result = await CartService.modificarCart(id,data)  
    res.json(result) 
   
}

export const  BorrarCartProducto = async(_id,pid)=> {  

    const result = await CartService.BorrarCartProducto(_id,pid)  
    res.json(result) 
   
}