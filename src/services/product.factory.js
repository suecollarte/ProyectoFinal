import config from "../config/config.js"

let ProductDao
//console.log(config.persistence)
switch (config.persistence){
    case 'MONGO':
        const {default:ProductMongoDAO}= await import("../dao/product.mongo.dao.js")
        //importacion dinamica
        ProductDao = ProductMongoDAO
        break;
        case 'FILE':
            const {default:ProductFileDAO} = await import('../dao/product.file.dao.js')
            ProductDao = ProductFileDAO
        break;
    default:
            break;
}

export default ProductDao