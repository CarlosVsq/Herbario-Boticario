const pool = require('../config/db');

const PlantaModel = {
    crear: async ({ nombre, nombre_cientifico, descripcion, cuidados }) => {
        const [result] = await pool.execute(
            'INSERT INTO planta (nombre, nombre_cientifico, descripcion, cuidados) VALUES (?, ?, ?, ?)',
            [nombre, nombre_cientifico || null, descripcion || null, cuidados || null]
        );
        return { id: result.insertId, nombre, nombre_cientifico, descripcion, cuidados };
    },

    obtenerTodas: async () => {
        const [rows] = await pool.execute('SELECT * FROM planta');
        return rows;
    },

    obtenerPorId: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM planta WHERE id = ?', [id]);
        return rows[0] || null;
    },

    actualizar: async (id, { nombre, nombre_cientifico, descripcion, cuidados }) => {
        await pool.execute(
            'UPDATE planta SET nombre = ?, nombre_cientifico = ?, descripcion = ?, cuidados = ? WHERE id = ?',
            [nombre, nombre_cientifico || null, descripcion || null, cuidados || null, id]
        );
        return { id, nombre, nombre_cientifico, descripcion, cuidados };
    },

    actualizarCampo: async (id, campo, valor) => {
        // Validación del campo para evitar inyección SQL (ya que no se puede parametrizar el nombre de la columna)
        const camposPermitidos = ['nombre', 'cuidados'];
        if (!camposPermitidos.includes(campo)) {
            throw new Error('Campo no permitido');
        }
        await pool.execute(
            `UPDATE planta SET ${campo} = ? WHERE id = ?`,
            [valor, id]
        );
        return true;
    },

    eliminar: async (id) => {
        const [result] = await pool.execute('DELETE FROM planta WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = PlantaModel;
