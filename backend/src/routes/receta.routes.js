const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/receta.controller');

router.post('/', RecetaController.crear);
router.put('/:id', RecetaController.actualizar);
router.delete('/:id', RecetaController.eliminar);

module.exports = router;
