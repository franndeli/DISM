'use strict';

const { login } = require('../auth/authController');
const { verifyToken } = require('../auth/authController');

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
exports.usuariosDELETE = function(req, idUsuario) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);
      const query= 'DELETE FROM usuarios WHERE idUsuario = ?'

      db.query(query, idUsuario, function(error, results){
        if(error){
          reject({
            message: "Error al eliminar al usuario", error:error
          });
        } else if (results.affectedRows > 0) {
          resolve({
            message: "Usuario eliminado con éxito", 
            tokenInfo: tokenVerification
          });
        } else {
          reject({
            message: "Usuario no encontrado con ID " + idUsuario,
            error: error
          })
        }
        // console.log(results);
      })
    } catch (error) {
      reject(error);
    }
    
  });
}


/**
 * Obtener todos los usuarios
 * Retorna una lista de todos los usuarios (solo admin).
 *
 * returns List
 **/

// Cambia req por token en la firma de la función
exports.usuariosGET = function(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      let query = 'SELECT * FROM usuarios';
      const queryParams = [];

      if(req.query.rol) {
        query += ' WHERE usuarios.Tipo = ?'
        queryParams.push(req.query.rol);
      }

      db.query(query, queryParams, function(error, results) {
        if (error) {
          reject({
            message: "Error al obtener los usuarios",
            error: error
          });
        } else {
          resolve({
            message: "Usuarios obtenidos con éxito",
            body: results,
            tokenInfo: tokenVerification
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.usuariosIdUsuarioGET = function(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const query = 'SELECT * FROM usuarios WHERE idUsuario = ?';
      
      //console.log(req.openapi.pathParams.idUsuario);

      db.query(query, req.openapi.pathParams.idUsuario, function(error, results) {
        if (error) {
          reject({
            message: "Error al obtener el usuario",
            error: error
          });
        } else if (results.length > 0) {
          resolve({
            message: "Usuario obtenido con éxito",
            body: results[0],
            tokenInfo: tokenVerification
          });
        } else {
          reject({
            message: "Usuario no encontrado con ID " + idUsuario,
            error: error
          });
        }
      });
    } catch (error) {
      reject(error);
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

exports.usuariosIdUsuarioPUT = function(req, body, idUsuario) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const secure = 'SELECT * FROM usuarios WHERE idUsuario = ?';
      db.query(secure, idUsuario, function(error,results){
        // console.log(results);
        if(results.length == 0){
          reject({
            message: "No existe ningún usuario con ID " + idUsuario, error: error
          })
        } else {
          const query = 'UPDATE usuarios SET idUsuario = ?, Nombre = ?, Usuario = ?, Clave = ?, Tipo = ? WHERE idUsuario = ?'

          db.query(query, [idUsuario, body.Nombre, body.Usuario, body.Clave, 'Usuario', idUsuario], function(error, results){
            // console.log(results);
            if(results.affectedRows > 0){
              resolve({
                message: "Usuario modificado con éxito", 
                result: body,
                tokenInfo: tokenVerification
              })
            } else {
              reject({
                message: "No se ha podido modificar el usuario", error: error
              })
            }
          })
        }
      })
    } catch (error) {
      reject (error);
    }
  });
}


/**
 * Crear un nuevo usuario
 * Crea un nuevo usuario (solo admin).
 *
 * body Usuario 
 * no response value expected for this operation
 **/
exports.usuariosPOST = function(req, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const secure = 'SELECT * FROM usuarios WHERE idUsuario = ?';

      db.query(secure, body.idUsuario, function(error, results){
        if(results.length>0){
          reject({
            message:"El ID " + body.idUsuario + " ya existe en Usuarios"
          })
        } else {
          const query = `INSERT INTO usuarios (idUsuario, Nombre, Usuario, Clave, Tipo) VALUES (?, ?, ?, ?, 'Usuario')`;

          db.query(query, [body.idUsuario, body.Nombre, body.Usuario, body.Clave], function(error, results){
            if (error){
              reject({
                message:"Error al crear el usuario", error: error
              });
            } else {
              resolve({
                message:"Usuario creado con éxito", 
                usuarioCreado: body,
                tokenInfo: tokenVerification
              });
            }
          });
        }
      })
    } catch (error) {
      reject(error);
    }
  });
};

