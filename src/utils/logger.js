import winston from "winston"
const colors={
    debug:"white",
    http:"green",
    info: "blue",
    warning:"yellow",
    error:"cyan",
    fatal:"red"

}
winston.addColors(colors)

const logger= winston.createLogger({
  levels:{
        debug:0,
        http:1,
        info: 2,
        warning:3,
        error:4,
        fatal:5
    },
    
    transports:[
        new winston.transports.Console({
            level:'http',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )})
        //debug, http, info, warning, error, fatal
//silly debug verbose http info wam error
        , new winston.transports.File({
            filename:'./debug.log',
            level:'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./fatal.log',
            level:'fatal',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./info.log',
            level:'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./warn.log',
            level:'warning',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./error.log',
            level:'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
})

 
export default logger