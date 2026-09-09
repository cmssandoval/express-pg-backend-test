const { pool } = require('../database/databaseConnection.js');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const User = require('../entities/user.entity.js');

/**
 * Adds a new User to the database.
 * @param {Like<User>} userLike User-like data.
 * @returns {Promise<Object|Error>} User added.
 */
const addUser = async ( userLike ) => {
    try {
        const user = new User( userLike );
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

        const query = `INSERT INTO users
            (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email`;
        const values = [user.name, user.email, hashedPassword];
        const result = await pool.query(query, values);

        console.log('User added to the database successfully');
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes an existing User from the database.
 * @param {String} userId Target User id.
 * @returns {Promise<Object|Error>} User deleted.
 */
const deleteUserById = async ( userId ) => {
    try {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

/**
 * Gets an existing User from the database.
 * @param {String} userId Target User id.
 * @returns {Promise<Object|Error>} A User that matches the id.
 */
const getUserById = async ( userId ) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);

    if ( result.rows.length === 0) {
        const error = new Error(`The user with id ${userId} does not exists`);
        error.status = 404;
        throw error;
    }
    
    return result.rows[0];
};

/**
 * Gets all Users stored in the database.
 * @returns {Promise<Array<Object>|Error>} All Users stored in the database.
 */
const getUsers = async () => {
    try {
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);

        return result.rows;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates a User replacing each property stored by new values.
 * @param {Like<User>} userLike User like data to replace the stored User with.
 * @param {String} userId Target User id to replace its data.
 * @returns {Promise<Object|Error>} User updated.
 */
const updateUserById = async ( userLike, userId ) => {
    try {
        const user = new User( userLike );
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
        
        const query =
            `UPDATE users SET
                name = $1,
                email = $2,
                password = $3
            WHERE id = $4
            RETURNING id, name, email
        `;

        const values = [user.name, user.email, hashedPassword, userId];
        const result = await pool.query(query, values);

        if ( result.rows.length === 0) {
            const error = new Error(`The user with id ${userId} does not exists`);
            error.status = 404;
            throw error;
        }

        console.log(`The user with id ${userId} has been updated`);
        return result.rows[0];
    } catch (error) {
        throw error;
    } 
};

/**
 * userModel contains an object with functions to manipulate User type data. 
 */
const userModel = {
    addUser,
    deleteUserById,
    getUserById,
    getUsers,
    updateUserById,
};

module.exports = userModel;