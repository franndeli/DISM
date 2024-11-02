'use strict';

const db = require('../utils/db');
const { verifyToken } = require('../auth/authController');

/**
 * Eliminar un trabajo
 * Elimina un trabajo existente (solo admin).
 *
 * idTrabajo Integer 
 * no response value expected for this operation
 **/
exports.trabajosDELETE = function(req, idTrabajo) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const query= 'DELETE FROM trabajos WHERE idTrabajo = ?'

      db.query(query, idTrabajo, function(error, results){
        if(error){
          reject({
            message: "Error al eliminar el trabajo", error:error
          });
        } else if (results.affectedRows > 0) {
          resolve({
            message: "Trabajo eliminado con éxito",
            tokenInfo: tokenVerification
          });
        } else {
          reject({
            message: "Trabajo no encontrado con ID " + idTrabajo
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
 * Obtener todos los trabajos
 * Retorna una lista de todos los trabajos.
 *
 * returns List
 **/
exports.trabajosGET = function(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const query = 'SELECT * FROM trabajos'
      db.query(query, function (error, results){
        if (error){
          reject({
            message:"Error al obtener los trabajos", error: error
          });
        } else {
          resolve({
            message:"Trabajos obtenidos con éxito", 
            body: results,
            tokenInfo: tokenVerification
          });
        }
      })
    } catch (error) {
      reject(error);
    }
  });
}

exports.trabajosIdTrabajoGET = function(req, id) {
  return new Promise(async(resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const query = 'SELECT * FROM trabajos WHERE idTrabajo = ?'
      db.query(query, id, function (error, results){
        if (results<=0){
          reject({
            message:"No existe ningún trabajo con ID " + id, error: error
          });
        } else {
          resolve({
            message:"Trabajo obtenido con éxito", 
            body: results,
            tokeinInfo: tokenVerification
          });
        }
      })
    } catch(error) {
      reject(error);
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
exports.trabajosIdTrabajoPUT = function(req, body, idTrabajo) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const secure = 'SELECT * FROM trabajos WHERE idTrabajo = ?';
      db.query(secure, idTrabajo, function(error,results){
        // console.log(results);
        if(results.length == 0){
          reject({
            message: "No existe ningún trabajo con ID " + idTrabajo, error: error
          })
        } else {
          const secure2 = 'SELECT * FROM trabajos WHERE idTrabajo = ?';
          db.query(secure2, body.idTrabajo, function(error, results){
            if(results.length != 0 && body.idTrabajo != idTrabajo){
              reject({
                message: "El ID " + body.idTrabajo + " ya existe en la base de datos", error: error
              })
            } else {
              const query = 'UPDATE trabajos SET idTrabajo = ?, Nombre = ? WHERE idTrabajo = ?'
              db.query(query, [body.idTrabajo, body.nombre, idTrabajo], function(error, results){
                // console.log(results);
                console.log(error);
                if(results.affectedRows > 0){
                  resolve({
                    message: "Trabajo modificado con éxito", 
                    result: body ,
                    tokenInfo: tokenVerification
                  })
                } else {
                  reject({
                    message: "No se ha podido modificar el trabajo", error: error
                  })
                }
              })
            }
          })
        }
      })
    } catch(error) {
      reject(error);
    }
  });
}


/**
 * Crear un nuevo trabajo
 * Crea un nuevo trabajo (solo admin).
 *
 * body Trabajo 
 * no response value expected for this operation
 **/
exports.trabajosPOST = function(req, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const secure = 'SELECT * FROM trabajos WHERE idTrabajo = ?';
      db.query(secure, body.idTrabajo, function(error, results){
        if(results.length>0){
          reject({
            message:"El ID " + body.idTrabajo + " ya existe en Trabajos"
          })
        } else {
          const query = 'INSERT INTO trabajos (idTrabajo, Nombre) VALUES (?, ?)';

          db.query(query, [body.idTrabajo, body.nombre], function(error, results){
            if (error){
              reject({
                message:"Error al crear el trabajo", error: error
              });
            } else {
              resolve({
                message:"Trabajo creado con éxito", 
                trabajoCreado: body,
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
}

