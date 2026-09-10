const userModel = require('../models/user.model.js');
const asyncHandler = require('../utils/asyncHandler.js');

const readUsers = asyncHandler(async ( req, res ) => {
    const response = await userModel.getUsers();
    return res.status(200).json(response);
});

const readUserById = asyncHandler(async ( req, res ) => {
    const { id } = req.params;

    const response = await userModel.getUserById( id );

    return res.status(200).json(response);
})

const createUser =  asyncHandler(async ( req, res ) => {
    const userLike = req.body;

    const response = await userModel.addUser( userLike );

    return res.status(201).json({
        message: "User Created",
        user: response,
    });
})

const removeUserById = asyncHandler(async ( req, res ) => {
    const { id } = req.params;
    
    const response = await userModel.deleteUserById( id );

    return res.status(200).json({
        message: "User Deleted",
        user: response,
    });
});

const updateUserById = asyncHandler(async ( req, res ) => {
    const { id } = req.params;
    const userLike = req.body;

    const response = await userModel.updateUserById( userLike, id );

    return res.status(200).json({
        message: "Updated User",
        updatedUser: response,
    });
});

const userController = {
    readUsers,
    readUserById,
    createUser,
    removeUserById,
    updateUserById,
};

module.exports = { userController };