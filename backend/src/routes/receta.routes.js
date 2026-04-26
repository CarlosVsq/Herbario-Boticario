const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/receta.controller');

router.post('/', RecetaController.crear);

module.exports = router;
