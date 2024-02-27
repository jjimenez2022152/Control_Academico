const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        default: "STUDENT_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    },
    cursos: {
        type: [Schema.Types.ObjectId],
        ref: 'Curso',
        default: [] // Inicializar como un array vacío por defecto
    }
});

AlumnoSchema.methods.toJSON = function () {
    const { __v, password, _id, ...alumno } = this.toObject();
    alumno.uid = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);
