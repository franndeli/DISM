'use strict';


/**
 * Obtener todos los fichajes
 * Retorna una lista de fichajes filtrados por fechas y usuario (solo admin).
 *
 * idUsuario Integer  (optional)
 * fechaInicio Date  (optional)
 * fechaFin Date  (optional)
 * returns List
 **/
exports.fichajesGET = function(idUsuario,fechaInicio,fechaFin) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "idFichaje" : 100,
  "idTrabajo" : 1,
  "fechaHoraSalida" : "2024-10-21T17:00:00Z",
  "idUsuario" : 1,
  "geolocalizacionLongitud" : -3.70379,
  "geolocalizacionLatitud" : 40.416775,
  "fechaHoraEntrada" : "2024-10-21T08:00:00Z"
}, {
  "idFichaje" : 100,
  "idTrabajo" : 1,
  "fechaHoraSalida" : "2024-10-21T17:00:00Z",
  "idUsuario" : 1,
  "geolocalizacionLongitud" : -3.70379,
  "geolocalizacionLatitud" : 40.416775,
  "fechaHoraEntrada" : "2024-10-21T08:00:00Z"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finalizar un fichaje
 * Actualiza un fichaje existente con la hora de salida.
 *
 * body Fichaje 
 * idFichaje Integer 
 * no response value expected for this operation
 **/
exports.fichajesIdFichajePUT = function(body,idFichaje) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Crear un nuevo fichaje
 * Crea un nuevo fichaje para un usuario.
 *
 * body Fichaje 
 * no response value expected for this operation
 **/
exports.fichajesPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

