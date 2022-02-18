class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
        this.name=message.name;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports=ErrorHandler;