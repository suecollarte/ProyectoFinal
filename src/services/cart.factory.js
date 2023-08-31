import config from "../config/config.js"

export let Cart

switch (config.persistence){
    case 'MONGO':
        const {default:ProductMongoDAO}= await import("../dao/product.mongo.dao.js")
        //importacion dinamica
        Product = ProductMongoDAO
       
        break;
        case 'FILE':
            const {default:ProductFileDAO} = await import('../dao/product.file.dao.js')
            Product = ProductFileDAO
        break;
    default:
            break;
}