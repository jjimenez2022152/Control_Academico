const esTeacherRole = (req, res, next) => {
    if (!req.maestro && !req.alumno) {
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token primero"
        });
    }

    const user = req.maestro || req.alumno;

    if (user && user.role !== "TEACHER_ROLE") {
        return res.status(401).json({
            msg: `${user.nombre} no es un Teacher, no tienes acceso a esto`
        });
    };
    next();
}

const tieneRolAutorizado = (...roles) => {
    return (req, res, next) => {
        if (!req.maestro && !req.alumno) {
            return res.status(500).json({
                msg: "Se desea validar un usuario sin validar token primero"
            });
        }

        const user = req.maestro || req.alumno;

        if (user && !roles.includes(user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados: ${roles.join(", ")}`
            });
        }
        next();
    }
}

module.exports = {
    esTeacherRole,
    tieneRolAutorizado
}