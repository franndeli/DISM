'use strict';

var utils = require('../utils/writer.js');
var Usuarios = require('../service/UsuariosService');

module.exports.loginPOST = function loginPOST (req, res, next, body) {
  Usuarios.loginPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutPOST = function logoutPOST (req, res, next) {
  Usuarios.logoutPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosDELETE = function usuariosDELETE (req, res, next, idUsuario) {
  Usuarios.usuariosDELETE(req, idUsuario)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosGET = function usuariosGET (req, res, next) {
  Usuarios.usuariosGET(req, res)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosIdUsuarioGET = function usuariosIdUsuarioGET (req, res, next, idUsuario) {
  Usuarios.usuariosIdUsuarioGET(req, res, idUsuario)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosIdUsuarioPUT = function usuariosIdUsuarioPUT (req, res, next, body, idUsuario) {
  Usuarios.usuariosIdUsuarioPUT(req, body, idUsuario)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosPOST = function usuariosPOST (req, res, next, body) {
  Usuarios.usuariosPOST(req, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
