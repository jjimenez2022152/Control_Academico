const { Router } = require('express');
const { check } = require('express-validator');
const { alumnosPost, alumnosGet, getAlumnoById, alumnosPut, alumnosDelete } = require('../controller/alumno.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeAsignaAlumCurso } = require('../helpers/db-validators')
const { existenteEmail, esRoleValido, existeAlumnoById, existeCursoByIdA } = require('../helpers/db-validators');
const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos
    ], alumnosPost
);

router.get("/", alumnosGet);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeAlumnoById),
        check("curso", "El límite de cursos a los cuales puedes asignarte es de 3").isArray({ max: 3 }),
        check('curso.*').custom(async (cursoId) => {
            if (!cursoId) {

                return true;
            }
            await existeCursoByIdA(cursoId);
    
            return true;
        }),
        check('curso.*').custom(async (cursoId, { req }) => {
            const alumnoId = req.params.id;
            if (await existeAsignaAlumCurso(alumnoId, cursoId)) {
                throw new Error('El alumno ya está asignado en dicho curso');
            }
            return true;
        }),
        validarCampos
    ], alumnosPut);


router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeAlumnoById),
    ], getAlumnoById);

router.delete(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ], alumnosDelete);

module.exports = router