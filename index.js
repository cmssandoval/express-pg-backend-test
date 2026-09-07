const express = require('express');
const cors = require('cors');
require('dotenv');
const { userModel } = require('./models/user.model');

// Express app instantiation
const app = express();

// Server port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Server listening initialization
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}/`);
});

// GET all users
app.get('/users', async ( req, res ) => {
    try {
        const response = await userModel.getUsers();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

// GET a user by id
app.get('/users/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await userModel.getUserById( id );

        if ( response.message ) {
            return res.status(404).json({
                error: "User Not Found",
                message: response.message,
            });
        }

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

// POST a user
app.post('/users', async ( req, res ) => {
    try {
        const { name, email, password } = req.body;

        if ( !name || !email || !password) {
            return res.status(400).json({
                error: "Bad Request",
                message: "The request body must have valid data.",
            });
        }        

        const userLike = {
            name:       name.trim(),
            email:      email.trim(),
            password:   password.trim(),
        };

        const response = await userModel.addUser( userLike );
        // console.log( response );

        if ( response.message ) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: response.message,
            });
        }

        return res.status(201).json({
            message: "Usuario Creado",
            user: response,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

// DELETE a user by id
app.delete('/users/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await userModel.deleteUserById( id );

        return res.status(200).json({
            message: "Usuario Eliminado",
            user: response,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

// PUT (update) completely a user by its id
app.put('/users/:id', async ( req, res ) => {
    try {
        const { name, email, password } = req.body;
        const { id } = req.params;

        if ( !name || !email || !password) {
            return res.status(400).json({
                error: "Bad Request",
                message: "The request body must have valid data.",
            });
        }

        if ( !id ) {
            return res.status(400).json({
                error: "Bad Request",
                message: "The request id parameter must have valid data.",
            });
        }

        const userLike = {
            name:       name.trim(),
            email:      email.trim(),
            password:   password.trim(),
        };

        const response = await userModel.updateUserById( userLike, id );

        if ( response.message ) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: response.message,
            });
        }

        return res.status(200).json({
            message: "Updated User",
            updatedUser: response,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});