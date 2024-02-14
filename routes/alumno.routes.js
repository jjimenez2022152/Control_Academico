const { Router } = require('express');
const { check } = require('express-validator');
const { alumnosPost, alumnosGet, getAlumnoById, alumnosPut, alumnosDelete } = require('../controller/alumno.controller');
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

router.put(
    "/:id",
    [

    ], alumnosPut);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        //check('id').custom(existeUsuarioById),
        //validarCampos
    ], getAlumnoById);

router.delete(
"/:id",
    [   
        //validarJWT,
        //esAdminRole,
        //tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        //check('id').custom(existeUsuarioById),
        //validarCampos
    ], alumnosDelete);    

module.exports = router