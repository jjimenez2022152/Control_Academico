const jwt = require('jsonwebtoken');
const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');
const { request, response } = require('express');

const validarJWT = async(req = request, res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try{

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const maestro = await Maestro.findById(uid);

        if(!maestro){
            return res.status(401).json({
                msg: "not found / no teacher"
            });
        }

        if(!maestro.estado){
            return res.status(401).json({
                msg: "Token no válido, usuario con estado false"
            });
        }

        req.maestro = maestro;
        next();
        
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
} 
module.exports = {
    validarJWT
}