const pool = require('../config/db');

const PlantaModel = {
    crear: async ({ nombre, nombre_cientifico, descripcion }) => {
        const [result] = await pool.execute(
            'INSERT INTO planta (nombre, nombre_cientifico, descripcion) VALUES (?, ?, ?)',
            [nombre, nombre_cientifico || null, descripcion || null]
        );
        return { id: result.insertId, nombre, nombre_cientifico, descripcion };
    },
};

module.exports = PlantaModel;
