const { request, response } = require("express");
const Alumno = require("../models/alumno")
const Maestro = require("../models/maestro");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        // Buscar alumno
        let usuario = await Alumno.findOne({ correo });

        // Si no se encuentra al alumno, buscar maestro
        if (!usuario) {
            usuario = await Maestro.findOne({ correo });

            // Si no se encuentra ni alumno ni maestro, retornar mensaje de error
            if (!usuario) {
                return res.status(400).json({
                    msg: "Credenciales incorrectas, correo no existe en la base de datos."
                });
            }
        }

        // Validar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario no está activo en la base de datos."
            });
        }

        // Validar contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        // Generar token JWT
        const token = await generarJWT(usuario.id);

        // Responder con mensaje de éxito, usuario y token
        res.status(200).json({
            msg: "Bienvenido",
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuníquese con el administrador"
        });
    }
};


module.exports = {
    login
}