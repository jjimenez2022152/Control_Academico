const Role = require('../models/role');
const Alumno = require('../models/alumno');
const Maestro =  require('../models/maestro')

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const existeAlumnoById = async (id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`El alumno con el ${ id } no existe`)
    }
}

const existeMaestroById = async (id = '') => {
    const existeMaestro = await Maestro.findOne({id});
    if(existeMaestro){
        throw new Error(`El maestro con el ${ id } no existe`)
    }
}

module.exports = {
    esRoleValido,
    existenteEmail,
    existeAlumnoById,
    existeMaestroById
}