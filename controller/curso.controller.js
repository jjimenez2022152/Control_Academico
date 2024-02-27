const Curso = require('../models/curso');
const { response, request } = require('express');
const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');

const cursosPost = async (req, res) => {
    const { _id } = req.usuario;

    const { nombre, descripcion } = req.body;
    const curso = new Curso({ nombre, descripcion, maestro: _id });

    await curso.save();
    res.status(202).json({
        curso
    })
};

const cursosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

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
    const { id } = req.params;
    const cursos = await Curso.find({ _id: id });

    res.status(200).json({
        cursos
    });
}
// ///////////////////////////////////////////////

const getCursoPorMestro = async (req, res) => {
    try {
        const { _id, nombre } = req.usuario;
        const query = { maestro: _id, estado: true };

        const curso = await Promise.all([
            Curso.find(query)
        ]);
        res.status(200).json({
            msg: `Cursos de ${nombre}`,
            curso
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los cursos del Maestro' });
    }
};

// ///////////////////////////////////////////////
const putCursos = async (req, res = response) => {
    const { _id: _idUsuario, nombre } = req.usuario;
    const { id } = req.params;
    const { _id: _idCurso, ...resto } = req.body;

    const curso = await Curso.findById(id);

    const idUsuarioString = _idUsuario.toString();
    const idMestroString = curso.maestro._id.toString();

    if (idUsuarioString !== idMestroString) {
        return res.status(403).json({ msg: 'No tiene permisos para actualizar este curso' });
    }

    const MestroActualizado = await Maestro.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        mdg: `Curso actualizado exitosamente por ${nombre}`,
        curso
    });
}
// ////////////////////////////////////////////

const cursosDelete = async (req, res) => {
    const { _id, nombre } = req.usuario;
    const { id } = req.params;


    const curso = await Curso.findOneAndUpdate(
        { _id: id, maestro: _id },
        { estado: false },
    );

    if (!curso) {
        return res.status(404).json({ msg: 'Usted no tiene autorizacion a eliminar este curso.' });
    }

    res.status(200).json({
        mdg: `Curso eliminado exitosamente por ${nombre}`,
        curso
    });
}


// /////////////////////////////////
const cursosPorAlumno = async (req, res) => {
    try {
        const alumnoId = req.usuario._id;
        const alumnoCursos = await Alumno.findById(alumnoId).populate('cursos');

        const cursosActivos = alumnoCursos.cursos.filter(curso => curso.estado === true);

        res.status(200).json({ misCursos: cursosActivos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los cursos del alumno' });
    }
};

const asignarCursoAlumno = async (req, res) => {
    try {
        const { nombre } = req.body;
        const alumnoId = req.usuario._id;

        // Buscar el curso por su nombre
        const curso = await Curso.findOne({ nombre: nombre });

        // Verificar si el curso existe
        if (!curso) {
            return res.status(404).json({ msg: 'El curso no existe' });
        }

        const alumno = await Alumno.findById(alumnoId);

        // Verificar si el alumno existe
        if (!alumno) {
            return res.status(404).json({ msg: 'El alumno no existe' });
        }

        // Verificar si el curso ya está asignado al alumno
        if (alumno.cursos.includes(curso._id)) {
            return res.status(400).json({ msg: 'El curso ya está asignado al alumno' });
        }

        // Asignar el curso al alumno
        alumno.cursos.push(curso._id);
        await alumno.save();
        
        res.status(200).json({ 
            msg: 'Curso agregado al alumno correctamente',
            alumno
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al agregar el curso al alumno' });
    }
};







module.exports = {
    cursosPost,
    cursosGet,
    getCursoById,
    putCursos,
    cursosDelete,
    getCursoPorMestro,
    cursosPorAlumno,
    asignarCursoAlumno
}