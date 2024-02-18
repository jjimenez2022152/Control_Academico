const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { cursosPost, cursosGet, getCursoById, putCursos, cursosDelete } = require('../controller/curso.controller');

const { existeCursoById } = require('../helpers/db-validators');
const { tieneRolAutorizado } = require('../middlewares/validar-roles');
const { esTeacherRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", cursosGet);

router.post(
    "/",
    [
        validarJWT,
        esTeacherRole,
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("descripcion", "La descripcion no puede estar vacia").not().isEmpty(),
        validarCampos,
    ], cursosPost);
router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], getCursoById);
router.put(
    "/:id",
    [
        validarJWT,
        esTeacherRole,
        tieneRolAutorizado('TEACHER_ROLE', 'SUPER_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeCursoById),

        validarCampos
    ], putCursos);
    router.delete(
        "/:id",
        [
            validarJWT,
            esTeacherRole,
            tieneRolAutorizado('TEACHER_ROLE', 'SUPER_ROLE'),
            check('id', 'No es un id válido').isMongoId(),
            check('id').custom(existeCursoById),
            validarCampos
        ], 
        cursosDelete
    );


    module.exports = router;