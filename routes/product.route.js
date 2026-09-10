const { Router } = require('express');
const { productController } = require('../controllers/product.controller.js');
const validateProductBody = require('../middlewares/validateProductBody.js');
const validateIdParam = require('../middlewares/validateIdParam.js');

const router = Router();

router.get('/', productController.readProducts);
router.get('/:id', validateIdParam, productController.readProductById);

router.post('/', validateProductBody, productController.createProduct);

router.delete('/:id', validateIdParam, productController.removeProductById);

router.put('/:id', validateIdParam, validateProductBody, productController.updateProductById);

module.exports = router;