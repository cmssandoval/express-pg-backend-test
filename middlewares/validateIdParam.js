const validateIdParam = ( req, res, next ) => {
    const { id } = req.params;

    const isValidId = /^\d+$/.test( id );

    if( !id || !isValidId ) {
        const error = new Error(`The id parameter must be a numeric string. '${id}' is not valid.`);
        error.status = 400;
        return next(error);
    }

    next();
};

module.exports = validateIdParam;