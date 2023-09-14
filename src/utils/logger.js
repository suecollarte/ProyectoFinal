import winston from "winston"

export const logger= winston.createLogger({
    transports:[
        new winston.transports.Console({level:'http'})
        //debug, http, info, warning, error, fatal
//silly debug verbose http info wam error
        , new winston.transports.File({
            filename:'./error.log',
            level:'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./http.log',
            level:'http',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./info.log',
            level:'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./warn.log',
            level:'warn',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./error.log',
            level:'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            )
        })
    ]
})