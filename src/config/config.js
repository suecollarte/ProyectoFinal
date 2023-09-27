import dotenv from 'dotenv'

dotenv.config()

export default{
    apiserver:{
        port: process.env.PORT || 8080
    },
    persistence: process.env.PERSISTENCE || 'FILE',
    mongo:{
        uri: process.env.MONGO_URI,
        dbname: process.env.MONGODB   
    },
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS
}