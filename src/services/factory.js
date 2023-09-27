import config from '../config/config.js'

import mongoose, {mongo} from "mongoose"

export let UserDao
export let TicketDao


//console.log(config.persistence)
switch (config.persistence){
    case 'MONGO':
        mongoose.connect(config.mongoURI,{
            dbname: config.mongoDBname
        })
        const {default:TicketMongoDAO}= await import("../dao/ticket.dao.mongo.js")
        //importacion dinamica
        TicketDao = TicketMongoDAO
        const {default:UserMongoDAO}= await import("../dao/user.mongo.dao.js")
        //importacion dinamica
        UserDao = UserMongoDAO
        break;
        case 'FILE':
            const {default:UserFileDAO} = await import('../dao/Manager/UserManagerFS.js')
            UserDao = UserFileDAO
            const {default:TicketFileDAO} = await import('../dao/Manager/TicketManagerFS.js')
            TicketDao = TicketFileDAO
        break;
    default:
            break;
}

export default ProductDao