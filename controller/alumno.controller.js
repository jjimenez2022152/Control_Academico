const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const { response } = require('express');

const alumnosPost = async (req, res) => {
    const { nombre, correo, password, role, cursos} = req.body;
    const alumno = new Alumno({ nombre, correo, password, role, cursos });

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(202).json({
        alumno
    });
}

module.exports = {
    alumnosPost
}