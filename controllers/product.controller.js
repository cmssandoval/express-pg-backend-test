const productModel = require('../models/product.model.js');
const asyncHandler = require('../utils/asyncHandler.js');

const readProducts = asyncHandler(async ( req, res ) => {
    const response = await productModel.getProducts();
    return res.status(200).json(response);
});

const readProductById = asyncHandler(async ( req, res ) => {
    const { id } = req.params;

    const response = await productModel.getProductById( id );

    return res.status(200).json(response);
})

const createProduct =  asyncHandler(async ( req, res ) => {
    const productLike = req.body;

    const response = await productModel.addProduct( productLike );

    return res.status(201).json({
        message: "Product Created",
        product: response,
    });
})

const removeProductById = asyncHandler(async ( req, res ) => {
    const { id } = req.params;
    
    const response = await productModel.deleteProductById( id );

    return res.status(200).json({
        message: "Product Deleted",
        product: response,
    });
});

const updateProductById = asyncHandler(async ( req, res ) => {
    const { id } = req.params;
    const productLike = req.body;

    const response = await productModel.updateProductById( productLike, id );

    return res.status(200).json({
        message: "Updated User",
        updatedUser: response,
    });
});

const productController = {
    readProducts,
    readProductById,
    createProduct,
    removeProductById,
    updateProductById,
};

module.exports = { productController };