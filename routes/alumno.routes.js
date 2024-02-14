const { Router } = require('express');
const { check } = require('express-validator');
const { alumnosPost, alumnosGet, getAlumnoById, alumnosPut, alumnosDelete } = require('../controller/alumno.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, esRoleValido, existeAlumnoById } = require('../helpers/db-validators');
const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos
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
        check('id').custom(existeAlumnoById),
        validarCampos
    ], getAlumnoById);

router.delete(
"/:id",
    [   
        //validarJWT,
        //esAdminRole,
        //tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ], alumnosDelete);    

module.exports = router