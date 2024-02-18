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
    const existeEmail = await Maestro.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeMaestroById = async (id = '') => {
    const existeMaestro = await Maestro.findOne({id});
    if(existeMaestro){
        throw new Error(`El maestro con el ${ id } no existe`)
    }
}

const existeAsignacionMaestroCurso = async (maestroId, cursoId) => {
    const asignacion = await Maestro.findOne({ _id: maestroId, curso: cursoId });
    return asignacion !== null;
};
//--------------------------------------------------------------------------------------


const existeAlumnoById = async (id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`El alumno con el ${ id } no existe`)
    }
}

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`el id ${id} no pertenece a un curso`)
    }
}

const existeAsignacionAlumnoCurso = async (alumnoId, cursoId) => {
    const asignacion = await Alumno.findOne({ _id: alumnoId, curso: cursoId });
    return asignacion !== null;
};

const existeEmailA = async (correo = '') => {
    const existeEmailA = await Alumno.findOne({correo});
    if(existeEmailA){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

module.exports = {
    esRoleValido,
    existenteEmail,
    existeMaestroById,
    existeCursoById,
    existeEmailA,
    existeAlumnoById,
    existeAsignacionAlumnoCurso,
    existeAsignacionMaestroCurso
}