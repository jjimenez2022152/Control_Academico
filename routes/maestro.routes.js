const { Router } = require('express');
const { check } = require('express-validator');
const { maestrosPost, maestrosGet, maestrosPut, getMaestroById, maestrosDelete } = require('../controller/maestro.controller');
const { existenteEmail, esRoleValido, existeAlumnoById, existeMaestroById } = require('../helpers/db-validators');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        //check("role").custom(esRoleValido),
        validarCampos
    ], maestrosPost
);

router.put(
    "/:id",
    [

    ], maestrosPut);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeMaestroById),
        validarCampos
    ], getMaestroById);

router.delete(
    "/:id",
        [   
            validarJWT,
            check('id', 'No es un id válido').isMongoId(),
            check('id').custom(existeMaestroById),
            validarCampos
        ], maestrosDelete);      

router.get("/", maestrosGet);


module.exports = router