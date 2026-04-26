const RecetaModel = require('../models/receta.model');

const RecetaController = {
    crear: async (req, res) => {
        try {
            const { titulo, instrucciones, uso, planta_id } = req.body;

            if (!titulo || !instrucciones || !planta_id) {
                return res.status(400).json({
                    error: 'Los campos "titulo", "instrucciones" y "planta_id" son obligatorios',
                });
            }

            const nuevaReceta = await RecetaModel.crear({ titulo, instrucciones, uso, planta_id });
            res.status(201).json(nuevaReceta);
        } catch (error) {
            console.error('Error al crear receta:', error);

            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'La planta indicada no existe' });
            }

            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
};

module.exports = RecetaController;
