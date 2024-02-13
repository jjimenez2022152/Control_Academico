const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const { response } = require('express');

const alumnosPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const alumno = new Alumno({ nombre, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(202).json({
        alumno
    });
}

const alumnosGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        alumnos
    });
}

const alumnosPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, password, estado, correo, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await Alumno.findByIdAndUpdate(id, resto);

    const alumno = Alumno.findOne({id});

    res.status(200).json({
        msg: 'Usuario Actualizado Exitosamente!!!',
        alumno
    });
}

module.exports = {
    alumnosPost,
    alumnosGet,
    alumnosPut  
}