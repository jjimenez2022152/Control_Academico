const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const Curso = require('../models/curso');

const { response } = require('express');

const alumnosPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const alumno = new Alumno({ nombre, correo, password });

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
    const { curso, ...resto } = req.body;

    try {
        if (!curso) {
            return res.status(400).json({ error: 'Parece que no ha definido CURSO en su solicitud' });
        }
        const cursosExistentes = await Curso.find({ _id: { $in: curso } });
        if (cursosExistentes.length !== curso.length) {
            return res.status(400).json({ error: 'Uno de sus cursos o todos no estan registrados en la Base de datos' });
        }
    
        const alumno = await Alumno.findByIdAndUpdate(id, { ...resto, curso });
    
        res.status(200).json({
            msg: 'Alumno actualizado',
            alumno
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el Alumno' });
    }
    
    
}

const alumnosDelete = async (req, res) => {
    const {id} = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id, {estado: false});
    const alumnoAutenticado = req.alumno;

    res.status(200).json({
        msg: 'Alumno a eliminar',
        alumno,
        alumnoAutenticado
    });
}

const getAlumnoById = async (req, res) => {
    const {id} = req.params;
    const alumno = await Alumno.findOne({_id: id});

    res.status(200).json({
        alumno
    });
}

module.exports = {
    alumnosPost,
    alumnosGet,
    alumnosPut,
    alumnosDelete,
    getAlumnoById
}