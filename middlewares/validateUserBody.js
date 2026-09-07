const validateUserBody = ( req, res, next ) => {
    const { name, email, password } = req.body;

    if ( !name || !email || !password) {
        const error = new Error("The request body must be complete and have valid data.");
        error.status = 400;
        return next(error);
    }

    next();
};

module.exports = validateUserBody;