const { Pool } = require('pg');
require('dotenv/config');

const pool = new Pool({
    allowExitOnIdle: true,
});

const databaseSetup = async () => {
    const createDatabaseQuery = 'CREATE DATABASE gestion_clientes';
    const createUsersTableQuery =
    `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR(50)
    )`;

    try {
        // const createDatabaseQueryResult = await pool.query(createDatabaseQuery);
        // console.log(createDatabaseQueryResult);
        
        const createUsersTableQueryResult = await pool.query(createUsersTableQuery);
        console.log(createUsersTableQueryResult);
        return console.log('La base de datos y la tabla han sido creadas');
    } catch (error) {
        return console.log('[ERROR]: ', error);
    }
};
// databaseSetup();

module.exports = { pool };