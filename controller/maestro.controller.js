const bcryptjs = require('bcryptjs');
const Maestro = require('../models/maestro');
const { response } = require('express');

const maestrosPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const maestro = new Maestro({ nombre, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    maestro.password = bcryptjs.hashSync(password, salt);

    await maestro.save();
    res.status(202).json({
        maestro
    });
};

const maestrosGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, maestros] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        maestros
    });
};

const maestrosPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, password,  correo,  ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const maestro =  await Maestro.findByIdAndUpdate(id, resto);

    

    res.status(200).json({
        msg: 'maestro Actualizado',
        maestro
    });
}

const getMaestroById = async (req, res) => {
    const {id} = req.params;
    const maestro = await Maestro.findOne({_id: id});

    res.status(200).json({
        maestro
    });
};

const maestrosDelete = async (req, res) => {
    const {id} = req.params;
    const maestro = await Maestro.findByIdAndUpdate(id, {estado: false});
    const maestroAutenticado = req.maestro;

    res.status(200).json({
        msg: 'maestro a eliminar',
        maestro,
        maestroAutenticado
    });
};

module.exports = {
    maestrosPost,
    maestrosGet,
    maestrosPut,
    getMaestroById,
    maestrosDelete
}