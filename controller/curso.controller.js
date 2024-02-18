const Curso = require('../models/curso');
const { response, request } = require('express');
const Maestro = require('../models/maestro');

const cursosPost = async (req, res) => {
    const {nombre, descripcion} = req.body;
    const curso = new Curso({nombre, descripcion});

    await curso.save();
    res.status(202).json({
        curso
    });

}

const cursosGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });

}

const getCursoById = async (req, res) => {
    const {id} = req.params;
    const cursos = await Curso.find({_id: id});

    res.status(200).json({
        cursos
    });
}

const putCursos = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    
  

    const curso = await Curso.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Curso Actualizado',
        curso
    })
}

const cursosDelete = async (req, res = response) => {
    const {id} = req.params;
    const curso = await Curso.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.maestro;

    res.status(200).json({
        msg: 'Curso A Eliminar',
        curso,
        usuarioAutenticado
    });
}

module.exports = {
    cursosPost,
    cursosGet,
    getCursoById,
    putCursos,
    cursosDelete
}