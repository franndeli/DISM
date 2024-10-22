'use strict';

var utils = require('../utils/writer.js');
var Fichajes = require('../service/FichajesService');

module.exports.fichajesGET = function fichajesGET (req, res, next, idUsuario, fechaInicio, fechaFin) {
  Fichajes.fichajesGET(idUsuario, fechaInicio, fechaFin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.fichajesIdFichajePUT = function fichajesIdFichajePUT (req, res, next, body, idFichaje) {
  Fichajes.fichajesIdFichajePUT(body, idFichaje)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.fichajesPOST = function fichajesPOST (req, res, next, body) {
  Fichajes.fichajesPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
