const pool = require('../config/db');

const RecetaModel = {
    crear: async ({ titulo, instrucciones, uso, planta_id }) => {
        const [result] = await pool.execute(
            'INSERT INTO receta (titulo, instrucciones, uso, planta_id) VALUES (?, ?, ?, ?)',
            [titulo, instrucciones, uso || null, planta_id]
        );
        return { id: result.insertId, titulo, instrucciones, uso, planta_id };
    },

    actualizar: async (id, { titulo, instrucciones, uso, planta_id }) => {
        await pool.execute(
            'UPDATE receta SET titulo = ?, instrucciones = ?, uso = ?, planta_id = ? WHERE id = ?',
            [titulo, instrucciones, uso || null, planta_id, id]
        );
        return { id, titulo, instrucciones, uso, planta_id };
    },

    eliminar: async (id) => {
        const [result] = await pool.execute('DELETE FROM receta WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = RecetaModel;
