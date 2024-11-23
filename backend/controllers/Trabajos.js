'use strict';

var utils = require('../utils/writer.js');
var Trabajos = require('../service/TrabajosService');

module.exports.trabajosDELETE = function trabajosDELETE (req, res, next, idTrabajo) {
  Trabajos.trabajosDELETE(req, idTrabajo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosGET = function trabajosGET (req, res, next) {
  Trabajos.trabajosGET(req)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosIdTrabajoGET = function trabajosIdTrabajoGET (req, res, next, body, idTrabajo) {
  Trabajos.trabajosIdTrabajoGET(req, res, idTrabajo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.trabajosIdTrabajoPUT = function trabajosIdTrabajoPUT (req, res, next, body, idTrabajo) {
  Trabajos.trabajosIdTrabajoPUT(req, body, idTrabajo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosPOST = function trabajosPOST (req, res, next, body) {
  Trabajos.trabajosPOST(req, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
