const { Router } = require('express');
const { userController } = require('../controllers/user.controller.js');
const validateUserBody = require('../middlewares/validateUserBody.js');
const validateIdParam = require('../middlewares/validateIdParam.js');

const router = Router();

router.get('/', userController.readUsers);
router.get('/:id', validateIdParam, userController.readUserById);

router.post('/', validateUserBody, userController.createUser);

router.delete('/:id', validateIdParam, userController.removeUserById);

router.put('/:id', validateIdParam, validateUserBody, userController.updateUserById);

//* IMPLEMENT USER LOGIN
// router.post('/login', asyncHandler(async ( req, res ) => {
//     const { email, password } = req.body;
//     const user = await userModel.getUserByEmail(email);

//     // Validate data, consider middleware.
//     // Also, consider middleware centralization.

//     return res.status(201).json({ message: "Successfull Login" });
// }));

module.exports = router;