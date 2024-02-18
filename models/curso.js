const { Schema, model} = require('mongoose');

const CursoSchema = Schema({

    nombre:{
        type: String,
        require: [true, "El nombre es obligatorio"],
        unique: true
    },
    descripcion:{
        type: String,
        require: [true, "la descripcion es obligatoria"]
    },
    estado:{
        type: Boolean,
        default: true
    }

});

module.exports = model('Curso', CursoSchema);