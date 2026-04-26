const express = require('express');
const cors = require('cors');

const plantaRoutes = require('./routes/planta.routes');
const recetaRoutes = require('./routes/receta.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/planta', plantaRoutes);
app.use('/receta', recetaRoutes);

module.exports = app;
