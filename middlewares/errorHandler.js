const errorHandler = ( err, req, res, next ) => {
    console.log(err);
    
    const status = err.status || 500;
    const message = ( status === 500 ) ? 'Internal Server Error' : err.message;

    return res.status(status).json({ error: message });
};

module.exports = errorHandler;