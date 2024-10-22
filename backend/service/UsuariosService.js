'use strict';

const { login } = require('../auth/authController');


/**
 * Iniciar sesión
 * Autenticar a un usuario (admin o usuario normal).
 *
 * body Login_body 
 * no response value expected for this operation
 **/
exports.loginPOST = function (body) {
  return new Promise(function (resolve, reject) {
    // Creamos una request y response simulada
    const req = { body };
    const res = {
      status: (statusCode) => ({
        json: (data) => {
          if (statusCode === 200) {
            resolve(data); // Devolvemos los datos en caso de éxito
          } else {
            reject(data); // Rechazamos en caso de error
          }
        },
      }),
    };

    // Llamamos a la función login del authController
    login(req, res);
  });
};


/**
 * Cerrar sesión
 * Finalizar la sesión del usuario.
 *
 * no response value expected for this operation
 **/
exports.logoutPOST = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Eliminar un usuario
 * Elimina un usuario existente (solo admin).
 *
 * idUsuario Integer 
 * no response value expected for this operation
 **/
exports.usuariosDELETE = function(idUsuario) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Obtener todos los usuarios
 * Retorna una lista de todos los usuarios (solo admin).
 *
 * returns List
 **/
exports.usuariosGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "clave" : "password123",
  "tipo" : "Usuario",
  "idUsuario" : 1,
  "usuario" : "jperez",
  "nombre" : "Juan Pérez"
}, {
  "clave" : "password123",
  "tipo" : "Usuario",
  "idUsuario" : 1,
  "usuario" : "jperez",
  "nombre" : "Juan Pérez"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Actualizar un usuario
 * Actualiza los datos de un usuario existente (solo admin).
 *
 * body Usuario 
 * idUsuario Integer 
 * no response value expected for this operation
 **/
exports.usuariosIdUsuarioPUT = function(body,idUsuario) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Crear un nuevo usuario
 * Crea un nuevo usuario (solo admin).
 *
 * body Usuario 
 * no response value expected for this operation
 **/
exports.usuariosPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

