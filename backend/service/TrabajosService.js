'use strict';


/**
 * Eliminar un trabajo
 * Elimina un trabajo existente (solo admin).
 *
 * idTrabajo Integer 
 * no response value expected for this operation
 **/
exports.trabajosDELETE = function(idTrabajo) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Obtener todos los trabajos
 * Retorna una lista de todos los trabajos.
 *
 * returns List
 **/
exports.trabajosGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "idTrabajo" : 1,
  "nombre" : "Desarrollo Web"
}, {
  "idTrabajo" : 1,
  "nombre" : "Desarrollo Web"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Actualizar un trabajo
 * Actualiza los datos de un trabajo existente (solo admin).
 *
 * body Trabajo 
 * idTrabajo Integer 
 * no response value expected for this operation
 **/
exports.trabajosIdTrabajoPUT = function(body,idTrabajo) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Crear un nuevo trabajo
 * Crea un nuevo trabajo (solo admin).
 *
 * body Trabajo 
 * no response value expected for this operation
 **/
exports.trabajosPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

