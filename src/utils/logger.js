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
           
            level:'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )})
        //debug, http, info, warning, error, fatal
//silly debug verbose http info wam error
        , new winston.transports.File({
            filename:'./logs/debug.log',
            level:'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./logs/fatal.log',
            level:'fatal',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
        ,new winston.transports.File({
            filename:'./logs/info.log',
            level:'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
  
        
    ]
})


 const loggerHttp = (req,res,next) =>{
    logger.info(`[${new Date().toLocaleTimeString()}] ${req.url} - ${req.method}`)
    next()
} 
export { logger,loggerHttp }