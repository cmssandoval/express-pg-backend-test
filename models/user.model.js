const { pool } = require('../database/databaseConnection.js');
const User = require('../entities/user.entity.js');

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

const userModel = {
    addUser,
    deleteUserById,
    getUserById,
    getUsers,
    updateUserById,
};

module.exports = { userModel };