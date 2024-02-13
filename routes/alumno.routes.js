const { Router } = require('express');
const { check } = require('express-validator');
const { alumnosPost, alumnosGet } = require('../controller/alumno.controller');
const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo"),
        check("role"),
        //validarCampos
    ], alumnosPost
);

router.get("/", alumnosGet);

// router.put(
//     "/:id",
//     [

//     ], alumnosPut);

module.exports = router