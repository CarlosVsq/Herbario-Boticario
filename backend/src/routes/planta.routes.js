const express = require('express');
const router = express.Router();
const PlantaController = require('../controllers/planta.controller');

router.post('/', PlantaController.crear);
router.get('/', PlantaController.obtenerTodas);
router.get('/:id', PlantaController.obtenerPorId);
router.put('/:id', PlantaController.actualizar);
router.patch('/:id/cuidados', PlantaController.editarCuidados);
router.patch('/:id/nombre', PlantaController.editarNombre);
router.delete('/:id', PlantaController.eliminar);

module.exports = router;
