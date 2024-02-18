const Role = require('../models/role');
const Alumno = require('../models/alumno');
const Maestro =  require('../models/maestro')
const Curso = require('../models/curso');

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

const existeAsignaMaesCurso = async (maestroId, cursoId) => {
    const asignacion = await Maestro.findOne({ _id: maestroId, curso: cursoId });
    return asignacion !== null;
};
//--------------------------------------------------------------------------------------
const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`el id ${id} no pertenece a un curso`)
    }
}



const existeAlumnoById = async (id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`El alumno con el ${ id } no existe`)
    }
}



const existeAsignaAlumCurso = async (alumnoId, cursoId) => {
    const asignacion = await Alumno.findOne({ _id: alumnoId, curso: cursoId });
    return asignacion !== null;
};

const existeEmailAlumno = async (correo = '') => {
    const existeEmailA = await Alumno.findOne({correo});
    if(existeEmailA){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeCursoByIdA = async (cursoId) => {
    const curso = await Curso.findById(cursoId);
    if (!curso || curso.eliminado) {
        throw new Error(`El curso con el ID ${cursoId} no existe o ha sido eliminado`);
    }
};

module.exports = {
    esRoleValido,
    existenteEmail,
    existeMaestroById,
    existeCursoById,
    existeEmailAlumno,
    existeAlumnoById,
    existeAsignaAlumCurso,
    existeAsignaMaesCurso,
    existeCursoByIdA
}