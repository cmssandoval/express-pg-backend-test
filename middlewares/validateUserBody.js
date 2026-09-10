const validateUserBody = ( req, res, next ) => {
    const { name, email, password } = req.body;

    if ( typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        const error = new Error("The request body must be complete and have valid data.");
        error.status = 400;
        return next(error);
    }

    const trimmedName       = name.trim();
    const trimmedEmail      = email.trim();
    const trimmedPassword   = password.trim();

    if ( !trimmedName || !trimmedEmail || !trimmedPassword ) {
        const error = new Error("The request body must be complete and have valid data.");
        error.status = 400;
        return next(error);
    }

    req.body = {
        name:       trimmedName,
        email:      trimmedEmail,
        password:   trimmedPassword,
    };

    next();
};

module.exports = validateUserBody;