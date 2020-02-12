const jwt = require('jsonwebtoken');

let SEED = require('../config/config').SEED;

// ==========================================
//  Verificar token
// ==========================================
exports.verificaToken = function(req, res, next) {

    let token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();

    });

}

// ==========================================
//  Verificar Admin
// ==========================================
exports.verificaADMIN_ROLE = function(req, res, next) {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });

    }

}

// ==========================================
//  Verificar Admin o Mismo usuario
// ==========================================
exports.verificaADMIN_o_MismoUsuario = function(req, res, next) {

    let usuario = req.usuario;
    let id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador ni el mismo usuario',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });

    }

}