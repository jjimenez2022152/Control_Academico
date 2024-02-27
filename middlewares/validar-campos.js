const { validationResult } = require("express-validator");
const Curso = require('../models/curso')


const validarCampos = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }

  next();
};


const validarCursos = async (req, res, next) => {
  try {
    const alumno = req.usuario;
    const { nombre } = req.body;

    const curso = await Curso.findOne({ nombre });

    if (alumno.cursos.includes(curso._id)) {
      return res.status(400).json({ msg: 'Ya estás asignado a este curso.' });
    }
    if (alumno.cursos.length >= 3) {
      return res.status(400).json({ msg: 'Ya estás asignado a tres cursos más.' });
    }
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error al validar los cursos del alumno' });
  }
}

module.exports = {
  validarCampos,
  validarCursos
};