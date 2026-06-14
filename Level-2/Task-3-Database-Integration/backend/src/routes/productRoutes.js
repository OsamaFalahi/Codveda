const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', protect, authorize(['ADMIN']), productController.create);
router.put('/:id', protect, authorize(['ADMIN']), productController.update);
router.delete('/:id', protect, authorize(['ADMIN']), productController.delete);

module.exports = router;