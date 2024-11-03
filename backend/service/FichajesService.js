'use strict';

const db = require('../utils/db');
const { verifyToken } = require('../auth/authController');

/**
 * Obtener todos los fichajes
 * Retorna una lista de fichajes filtrados por fechas y usuario (solo admin).
 *
 * idUsuario Integer  (optional)
 * fechaInicio Date  (optional)
 * fechaFin Date  (optional)
 * returns List
 **/
exports.fichajesGET = function(req, idUsuario, fechaInicio, fechaFin) {
  return new Promise(async(resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      let query = 'SELECT fichajes.*, trabajos.nombre AS trabajoNombre FROM fichajes LEFT JOIN trabajos ON fichajes.idTrabajo = trabajos.idTrabajo WHERE 1=1';

      const queryParams = [];

      if (idUsuario) {
        query += ' AND idUsuario = ?';
        queryParams.push(idUsuario);
      }

      if (fechaInicio) {
        const fechaInicioDate = new Date(fechaInicio);
        const fechaInicioMenos12Horas = new Date(fechaInicioDate);
        fechaInicioMenos12Horas.setHours(fechaInicioMenos12Horas.getHours() - 12);

        query += ' AND FechaHoraEntrada BETWEEN ? AND ?';
        queryParams.push(fechaInicioMenos12Horas.toISOString(), fechaInicio);
      }

      if (fechaFin) {
        console.log(fechaFin);
        query += ' AND FechaHoraSalida = ?';
        queryParams.push(fechaFin);
      }

      console.log(req.query.fechaFinIsNull);

      if (req.query.fechaFinIsNull === true) {
        query += ' AND FechaHoraSalida IS NULL';
      }

      db.query(query, queryParams, function(error, results) {
        if (error) {
          reject({
            message: "Error al obtener los fichajes",
            error: error
          });
        } else if (results.length === 0) {
          resolve({
            message: "No se encontraron fichajes con los parámetros especificados",
            tokenInfo: tokenVerification
          });
        } else {
          resolve({
            message: "Fichajes obtenidos con éxito",
            body: results
          });
        }
      });
    } catch (error) {
      reject(error);
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
exports.fichajesIdFichajePUT = function(req, body, idFichaje) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const secure = 'SELECT * FROM fichajes WHERE idFichaje = ?';
      db.query(secure, idFichaje, function(error,results){
        if(results.length == 0){
          reject({
            message: "No existe ningún fichaje con ID " + idFichaje, error: error
          })
        } else {
          const query = 'UPDATE fichajes SET FechaHoraEntrada = ?, FechaHoraSalida = ?, HorasTrabajadas = ?, idTrabajo = ?, idUsuario = ?, GeolocalizacionLatitud = ?, GeolocalizacionLongitud = ? WHERE idFichaje = ?'

          db.query(query, [body.fechaHoraEntrada, body.fechaHoraSalida, body.horasTrabajadas, body.idTrabajo, body.idUsuario, body.geolocalizacionLatitud, body.geolocalizacionLongitud, idFichaje], function(error, results){
            // console.log(results);
            if(results.affectedRows > 0){
              resolve({
                message: "Fichaje modificado con éxito", result: body 
              })
            } else {
              reject({
                message: "No se ha podido modificar el fichaje", 
                error: error,
                tokenInfo: tokenVerification
              })
            }
          })
        }
      })
    } catch (error) {
      reject(error);
    }
  });
}


/**
 * Crear un nuevo fichaje
 * Crea un nuevo fichaje para un usuario.
 *
 * body Fichaje 
 * no response value expected for this operation
 **/
exports.fichajesPOST = function(req, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenVerification = await verifyToken(req);

      const columns = Object.keys(body).join(', ');
      const placeholders = Object.keys(body).map(() => '?').join(', ');
      const values = Object.values(body);

      const query = 'INSERT INTO fichajes (' + columns + ') VALUES (' + placeholders + ')';

      db.query(query, values, function(error, results){
        if (error){
          reject({
            message:"Error al crear el fichaje", error: error
          });
        } else {
          resolve({
            message:"Fichaje creado con éxito", 
            usuarioCreado: body,
            tokenInfo: tokenVerification
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

