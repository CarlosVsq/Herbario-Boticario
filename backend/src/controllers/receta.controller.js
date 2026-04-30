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

    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { titulo, instrucciones, uso, planta_id } = req.body;

            if (!titulo || !instrucciones || !planta_id) {
                return res.status(400).json({
                    error: 'Los campos "titulo", "instrucciones" y "planta_id" son obligatorios',
                });
            }

            const recetaActualizada = await RecetaModel.actualizar(id, { titulo, instrucciones, uso, planta_id });
            res.json(recetaActualizada);
        } catch (error) {
            console.error('Error al actualizar receta:', error);
            
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ error: 'La planta indicada no existe' });
            }

            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            const eliminado = await RecetaModel.eliminar(id);
            
            if (!eliminado) {
                return res.status(404).json({ error: 'Receta no encontrada' });
            }
            
            res.json({ mensaje: 'Receta eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar receta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = RecetaController;
