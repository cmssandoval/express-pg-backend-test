const { pool } = require('../database/databaseConnection.js');
const User = require('../entities/user.entity.js');

/**
 * Adds a new User to the database.
 * @param {Like<User>} userLike User like data.
 * @returns {Promise<Object|Error>} User added.
 */
const addUser = async ( userLike ) => {
    try {
        const user = new User( userLike );

        const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [user.name, user.email, user.password];
        const result = await pool.query(query, values);

        console.log('Usuario agregado a la base de datos');
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return error;
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
        console.log(error);
        return error;
    }
};

/**
 * Gets an existing User from the database.
 * @param {String} userId Target User id.
 * @returns {Promise<Object|Error>} A User that matches the id.
 */
const getUserById = async ( userId ) => {
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await pool.query(query, [userId]);

        if ( result.rows.length === 0) {
            return {message: `El usuario con id ${userId} no existe`};
        }

        return result.rows[0];
    } catch (error) {
        console.log(error);
        return error;
    }
};

/**
 * Gets all User stored in the database.
 * @returns {Promise<Array<Object>|Error>} All Users stored in the database.
 */
const getUsers = async () => {
    try {
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);

        return result.rows;
    } catch (error) {
        console.log(error);
        return error;
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
        const query =
            `UPDATE users SET
                name = $1,
                email = $2,
                password = $3
            WHERE id = $4
            RETURNING *`;
        const { name, email, password } = new User( userLike );
        const values = [name, email, password, userId];
        const result = await pool.query(query, values);

        console.log(`El usuario con id ${userId} ha sido actualizado`);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return error;
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

module.exports = { userModel };