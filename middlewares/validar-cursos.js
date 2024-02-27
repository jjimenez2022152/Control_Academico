const { validationResult } = require('express-validator');
const Curso = require('../models/curso');

const validarCursoDuplicado = async (req, res, next) => {
    try {

        const { nombre } = req.body;
        const existeCurso = await Curso.findOne({ nombre });

        if (existeCurso) {
            return res.status(400).json({ msg: 'Ya existe un curso con ese nombre' });
        }

        next();
    } catch (error) {
        console.error('Error al validar curso duplicado:', error);
        res.status(500).json({ msg: 'Hubo un error al validar el curso duplicado' });
    }
};

module.exports = validarCursoDuplicado;
