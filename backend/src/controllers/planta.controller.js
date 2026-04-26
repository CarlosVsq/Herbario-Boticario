const PlantaModel = require('../models/planta.model');

const PlantaController = {
    crear: async (req, res) => {
        try {
            const { nombre, nombre_cientifico, descripcion } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
            }

            const nuevaPlanta = await PlantaModel.crear({ nombre, nombre_cientifico, descripcion });
            res.status(201).json(nuevaPlanta);
        } catch (error) {
            console.error('Error al crear planta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
};

module.exports = PlantaController;
