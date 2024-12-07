class CustomError extends Error{
    constructor(message,statusCode){

        super(message)
        console.log("message:",message);
        this.statusCode=statusCode ||500
        this.status=statusCode >=400&&statusCode<=500?"faile":'error'
        this.isOperational=true
        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports=CustomError