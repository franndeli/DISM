'use strict';

var utils = require('../utils/writer.js');
var Trabajos = require('../service/TrabajosService');

module.exports.trabajosDELETE = function trabajosDELETE (req, res, next, idTrabajo) {
  Trabajos.trabajosDELETE(idTrabajo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosGET = function trabajosGET (req, res, next) {
  Trabajos.trabajosGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosIdTrabajoGET = function trabajosIdTrabajoGET (req, res, next, body, idTrabajo) {
  Trabajos.trabajosIdTrabajoGET(body, idTrabajo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.trabajosIdTrabajoPUT = function trabajosIdTrabajoPUT (req, res, next, body, idTrabajo) {
  Trabajos.trabajosIdTrabajoPUT(body, idTrabajo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosPOST = function trabajosPOST (req, res, next, body) {
  Trabajos.trabajosPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
