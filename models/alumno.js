const { Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role:{
        type: String,
        default: "STUDENT_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    },
    cursos:{
        type: [String],
        default: []
    }

});

AlumnoSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
};

module.exports = model('Alumno', AlumnoSchema);

