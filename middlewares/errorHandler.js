const errorHandler = ( err, req, res, next ) => {
    console.log(err);
    
    //* Example of dedicated error message based on database error code.
    //! This structure is a bad practice beacause we are anidating if statements.
    //? Consider creating a switch or maybe even better a function
    //? with error codes defined inside an object.
    //? An alternative is creating an ErrorHandling class and
    //? manage the logic with internal methods so the code is cleaner.
    if (err.code) {
        if ( err.code === "23502") {
            return res.status(400)
                .send("NOT NULL restriction has been violated in some parameter.");
        }
        if ( err.code === "23505") {
            return res.status(400)
                .send("Unicity restriction of 'users_email_key' has been violated.");
        }
    }

    const status = err.status || 500;
    const message = ( status === 500 ) ? 'Internal Server Error' : err.message;

    return res.status(status).json({ error: message });
};

module.exports = errorHandler;