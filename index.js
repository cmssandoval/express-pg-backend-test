require('dotenv');

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const validateIdParam = require('./middlewares/validateIdParam');
const validateUserBody = require('./middlewares/validateUserBody');

const userModel = require('./models/user.model');
const asyncHandler = require('./utils/asyncHandler');

const app = express();

const serverPort = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(serverPort, () => {
    console.log(`Server is on at http://localhost:${serverPort}/`);
});

// GET all users
app.get('/users', asyncHandler(async ( req, res ) => {
    const response = await userModel.getUsers();
    return res.status(200).json(response);
}));

// GET a user by id
app.get('/users/:id', validateIdParam, asyncHandler(async ( req, res ) => {
    const { id } = req.params;

    const response = await userModel.getUserById( id );

    return res.status(200).json(response);
}));

// POST a user
app.post('/users', validateUserBody, asyncHandler(async ( req, res ) => {
    const { name, email, password } = req.body;

    const userLike = {
        name:       name.trim(),
        email:      email.trim(),
        password:   password.trim(),
    };

    const response = await userModel.addUser( userLike );

    return res.status(201).json({
        message: "User Created",
        user: response,
    });
}));

// DELETE a user by id
app.delete('/users/:id', validateIdParam, asyncHandler(async ( req, res ) => {
    const { id } = req.params;
    
    const response = await userModel.deleteUserById( id );

    return res.status(200).json({
        message: "User Deleted",
        user: response,
    });
}));

// PUT (update) completely a user by its id
app.put('/users/:id', validateIdParam, validateUserBody, asyncHandler(async ( req, res ) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const userLike = {
        name:       name.trim(),
        email:      email.trim(),
        password:   password.trim(),
    };

    const response = await userModel.updateUserById( userLike, id );

    return res.status(200).json({
        message: "Updated User",
        updatedUser: response,
    });
}));

app.use(errorHandler);