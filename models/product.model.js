const { pool } = require('../database/databaseConnection.js');
const Product = require('../entities/product.entity.js');


/**
 * Adds a new product to the database.
 * @param {Like<Product>} productLike Product-like data.
 * @returns {Promise<Object|Error>} Product added.
 */
const addProduct = async ( productLike ) => {
    try {
        const product = new Product( productLike );

        const query = `INSERT INTO products
            (title, price, description, stock, imageURL)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;

        const values = [
            product.title,
            product.price,
            product.description,
            product.stock,
            product.imageURL
        ];

        const result = await pool.query(query, values);

        console.log('Product added to the database successfully');
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes an existing product from the database.
 * @param {String} productId Target product id.
 * @returns {Promise<Object|Error>} Product deleted.
 */
const deleteProductById = async ( productId ) => {
    try {
        const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [productId]);

    if ( result.rowCount === 0) {
        const error = new Error(`The product with id ${productId} does not exists`);
        error.status = 404;
        throw error;
    }

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

/**
 * Gets an existing product from the database.
 * @param {String} productId Target product id.
 * @returns {Promise<Object|Error>} A product that matches the id.
 */
const getProductById = async ( productId ) => {
    try {
        const query = 'SELECT * FROM products WHERE id = $1';
        const result = await pool.query(query, [productId]);

        if (result.rowCount === 0) {
            const error = new Error(`The product with id ${productId} does not exists`);
            error.status = 404;
            throw error;
        }

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

/**
 * Gets all products stored in the database.
 * @returns {Promise<Array<Object>|Error>} All products stored in the database.
 */
const getProducts = async () => {
    try {
        const query = 'SELECT * FROM products';
        const result = await pool.query(query);

        if ( result.rowCount === 0) {
            const error = new Error(`Products table is empty`);
            error.status = 404;
            throw error;
        }

        return result.rows;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates a product replacing each property stored by new values.
 * @param {Like<Product>} productLike Product like data to replace the stored product with.
 * @param {String} productId Target product id to replace its data.
 * @returns {Promise<Object|Error>} Product updated.
 */
const updateProductById = async ( productLike, productId ) => {
    try {
        const product = new Product( productLike );
        
        const query = `UPDATE products SET
            title       = $1,
            price       = $2,
            descr       = $3,
            stock       = $4,
            imageURL    = $5
            WHERE id    = $6
            RETURNING *`;

        const values = [
            product.title,
            product.price,
            product.description,
            product.stock,
            product.imageURL,
            productId,
        ];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            const error = new Error(`The product with id ${productId} does not exists`);
            error.status = 404;
            throw error;
        }

        console.log(`The product with id ${productId} has been updated`);
        return result.rows[0];
    } catch (error) {
        throw error;
    } 
};

/**
 * productModel contains an object with functions to manipulate product type data. 
 */
const productModel = {
    addProduct,
    deleteProductById,
    getProductById,
    getProducts,
    updateProductById,
};

module.exports = productModel;