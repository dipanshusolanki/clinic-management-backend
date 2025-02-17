const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {...err};
        error.message = err.message;
        console.log(error);

        // Mongoose Bad ObjectId Error
        if(err.name === "CastError")
        {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose Duplicate Key Error
        if(err.code === 11000)
        {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose Validation Error
        if(err.name === "ValidationError")
        {
            const message = Object.values(err.errors).map((value) => value.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(err.statusCode || 500).json({
            success: false,
            data: {
                message: error.message,
            }
        });
    }
    catch(error){
        next(error);
    }
}

export default errorMiddleware;
