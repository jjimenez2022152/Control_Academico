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
}

module.exports = {
    maestrosPost
}