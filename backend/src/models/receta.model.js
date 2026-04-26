const pool = require('../config/db');

const RecetaModel = {
    crear: async ({ titulo, instrucciones, uso, planta_id }) => {
        const [result] = await pool.execute(
            'INSERT INTO receta (titulo, instrucciones, uso, planta_id) VALUES (?, ?, ?, ?)',
            [titulo, instrucciones, uso || null, planta_id]
        );
        return { id: result.insertId, titulo, instrucciones, uso, planta_id };
    },
};

module.exports = RecetaModel;
