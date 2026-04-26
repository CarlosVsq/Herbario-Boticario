const express = require('express');
const router = express.Router();
const PlantaController = require('../controllers/planta.controller');

router.post('/', PlantaController.crear);

module.exports = router;
