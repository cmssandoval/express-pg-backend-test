const { Pool } = require('pg');
require('dotenv/config');

// The other needed configuration is imported from the .env file,
// you can create it following the .env.template file.
// Anyway, I will leave the needed lines to uncomment and edit
// if you have any problem with environment variables.
const pool = new Pool({
    // host:'localhost',
    // port:'5432',
    // database:'postgres',  // For first connection only.
    // user:'postgres',
    // password:'postgres',
    allowExitOnIdle: true,
});

// This function creates both the database and the table
// by changing the queries. The names can be turned into
// variables and create any database or any table.
const databaseSetup = async () => {
    const createDatabaseQuery = 'CREATE DATABASE gestion_clientes';
    const createUsersTableQuery =
    `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`;

    try {
        // const createDatabaseQueryResult = await pool.query(createDatabaseQuery);
        // console.log(createDatabaseQueryResult);
        
        const createUsersTableQueryResult = await pool.query(createUsersTableQuery);
        console.log(createUsersTableQueryResult);
        return console.log('The database and the table has been created');
    } catch (error) {
        return console.log('[ERROR]: ', error);
    }
};
// databaseSetup();

module.exports = { pool };