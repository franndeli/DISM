'use strict';

const { login } = require('../auth/authController');
const db = require('../utils/db');

/**
 * Iniciar sesión
 * Autenticar a un usuario (admin o usuario normal).
 *
 * body Login_body 
 * no response value expected for this operation
 **/
exports.loginPOST = function (body) {
  return new Promise(function (resolve, reject) {
    
    const req = { body };
    const res = {
      status: (statusCode) => ({
        json: (data) => {
          if (statusCode === 200) {
            resolve(data);
          } else {
            reject(data); 
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
    const query= 'DELETE FROM usuarios WHERE idUsuario = ?'

    db.query(query, idUsuario, function(error, results){
      if(error){
        reject({
          message: "Error al eliminar al usuario", error:error
        });
      } else if (results.affectedRows > 0) {
        resolve({
          message: "Usuario eliminado con éxito"
        });
      } else {
        reject({
          message: "Usuario no encontrado con ID " + idUsuario
        })
      }
      // console.log(results);
    })
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
    const query = 'SELECT * FROM usuarios'
    db.query(query, function (error, results){
      if (error){
        reject({
          message:"Error al obtener los usuarios", error: error
        });
      } else {
        resolve({
          message:"Usuarios obtenido con éxito", body: results
        });
      }
    })
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
    const secure = 'SELECT * FROM usuarios WHERE idUsuario = ?';
    db.query(secure, idUsuario, function(error,results){
      // console.log(results);
      if(results.length == 0){
        reject({
          message: "No existe ningún usuario con ID " + idUsuario, error: error
        })
      } else {

        const secure2 = 'SELECT * FROM usuarios WHERE idUsuario = ?';
        db.query(secure2, body.idUsuario, function(error, results){
          if(results.length != 0 && body.idUsuario != idUsuario){
            reject({
              message: "El ID " + body.idUsuario + " ya existe en la base de datos", error: error
            })
          } else {
            const query = 'UPDATE usuarios SET idUsuario = ?, Nombre = ?, Usuario = ?, Clave = ?, Tipo = ? WHERE idUsuario = ?'

            db.query(query, [body.idUsuario, body.nombre, body.usuario, body.clave, body.tipo, idUsuario], function(error, results){
              // console.log(results);
              if(results.affectedRows > 0){
                resolve({
                  message: "Usuario modificado con éxito", result: body 
                })
              } else {
                reject({
                  message: "No se ha podido modificar el usuario", error: error
                })
              }
            })
          }
        })
      }
    })
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
    const secure = 'SELECT * FROM usuarios WHERE idUsuario = ?';

    db.query(secure, body.idUsuario, function(error, results){
      if(results.length>0){
        reject({
          message:"El ID " + body.idUsuario + " ya existe en Usuarios"
        })
      } else {
        const query = 'INSERT INTO usuarios (idUsuario, Nombre, Usuario, Clave, Tipo) VALUES (?, ?, ?, ?, ?)';

        db.query(query, [body.idUsuario, body.nombre, body.usuario, body.clave, body.tipo], function(error, results){
          if (error){
            reject({
              message:"Error al crear el usuario", error: error
            });
          } else {
            resolve({
              message:"Usuario creado con éxito", usuarioCreado: body
            });
          }
        });
      }
    })
  });
};

