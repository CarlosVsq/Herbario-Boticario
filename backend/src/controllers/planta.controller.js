const PlantaModel = require('../models/planta.model');

const PlantaController = {
    crear: async (req, res) => {
        try {
            const { nombre, nombre_cientifico, descripcion, cuidados } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
            }

            const nuevaPlanta = await PlantaModel.crear({ nombre, nombre_cientifico, descripcion, cuidados });
            res.status(201).json(nuevaPlanta);
        } catch (error) {
            console.error('Error al crear planta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    obtenerTodas: async (req, res) => {
        try {
            const plantas = await PlantaModel.obtenerTodas();
            res.json(plantas);
        } catch (error) {
            console.error('Error al obtener plantas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    obtenerPorId: async (req, res) => {
        try {
            const planta = await PlantaModel.obtenerPorId(req.params.id);
            if (!planta) {
                return res.status(404).json({ error: 'Planta no encontrada' });
            }
            res.json(planta);
        } catch (error) {
            console.error('Error al obtener planta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    actualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, nombre_cientifico, descripcion, cuidados } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
            }

            const planta = await PlantaModel.obtenerPorId(id);
            if (!planta) {
                return res.status(404).json({ error: 'Planta no encontrada' });
            }

            const plantaActualizada = await PlantaModel.actualizar(id, { nombre, nombre_cientifico, descripcion, cuidados });
            res.json(plantaActualizada);
        } catch (error) {
            console.error('Error al actualizar planta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    editarCuidados: async (req, res) => {
        try {
            const { id } = req.params;
            const { cuidados } = req.body;

            const planta = await PlantaModel.obtenerPorId(id);
            if (!planta) {
                return res.status(404).json({ error: 'Planta no encontrada' });
            }

            await PlantaModel.actualizarCampo(id, 'cuidados', cuidados || null);
            res.json({ mensaje: 'Cuidados actualizados correctamente' });
        } catch (error) {
            console.error('Error al editar cuidados:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    editarNombre: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;

            if (!nombre) {
                return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
            }

            const planta = await PlantaModel.obtenerPorId(id);
            if (!planta) {
                return res.status(404).json({ error: 'Planta no encontrada' });
            }

            await PlantaModel.actualizarCampo(id, 'nombre', nombre);
            res.json({ mensaje: 'Nombre actualizado correctamente' });
        } catch (error) {
            console.error('Error al editar nombre:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    eliminar: async (req, res) => {
        try {
            const { id } = req.params;
            const eliminado = await PlantaModel.eliminar(id);
            
            if (!eliminado) {
                return res.status(404).json({ error: 'Planta no encontrada' });
            }
            
            res.json({ mensaje: 'Planta eliminada correctamente' });
        } catch (error) {
            console.error('Error al eliminar planta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = PlantaController;
