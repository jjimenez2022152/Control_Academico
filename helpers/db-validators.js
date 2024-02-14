const Role = require('../models/role');
const Alumno = require('../models/alumno');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existeAlumnoById = async (id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`El usuario con el ${ id } no existe`)
    }
}

module.exports = {
    esRoleValido,
    existenteEmail,
    existeAlumnoById
}