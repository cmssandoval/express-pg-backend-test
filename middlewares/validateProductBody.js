const validateProductBody = ( req, res, next ) => {
    const { title, price, description, stock, imageURL } = req.body;

    if ( typeof title !== 'string' || typeof price !== 'number' || typeof description !== 'string' || typeof stock !== 'number' || typeof imageURL !== 'string' ) {
        const error = new Error("The request body must be complete and have valid data.");
        error.status = 400;
        return next(error);
    }

    const trimmedTitle          = title.trim();
    const trimmedDescription    = description.trim();
    const trimmedImageURL       = imageURL.trim();

    if ( !trimmedTitle || !trimmedDescription || !trimmedImageURL || price <= 0 || stock <= 0) {
        const error = new Error("The request body must be complete and have valid data.");
        error.status = 400;
        return next(error);
    }

    req.body = {
        title:          trimmedTitle,
        price:          price,
        description:    trimmedDescription,
        stock:          stock,
        imageURL:       trimmedImageURL,
    };

    next();
};

module.exports = validateProductBody;