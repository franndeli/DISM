'use strict';

const db = require('../utils/db');

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
    let query = 'SELECT * FROM fichajes WHERE 1=1';

    const queryParams = [];

    if (idUsuario) {
      query += ' AND idUsuario = ?';
      queryParams.push(idUsuario);
    }

    if (fechaInicio) {
      query += ' AND FechaHoraEntrada = ?';
      queryParams.push(fechaInicio);
    }

    if (fechaFin) {
      query += ' AND FechaHoraSalida = ?';
      queryParams.push(fechaFin);
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
          body: []
        });
      } else {
        resolve({
          message: "Fichajes obtenidos con éxito",
          body: results
        });
      }
    });
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
    const secure = 'SELECT * FROM fichajes WHERE idFichaje = ?';
    console.log('hola');
    db.query(secure, idFichaje, function(error,results){
      if(results.length == 0){
        reject({
          message: "No existe ningún fichaje con ID " + idFichaje, error: error
        })
      } else {

        const columns = Object.keys(body).join(' = ?, ');
        const values = Object.values(body);

        const query = 'UPDATE fichajes SET FechaHoraEntrada = ?, FechaHoraSalida = ?, HorasTrabajadas = ?, idTrabajo = ?, idUsuario = ?, GeolocalizacionLatitud = ?, GeolocalizacionLongitud = ? WHERE idFichaje = ?'

        db.query(query, [body.fechaHoraEntrada, body.fechaHoraSalida, body.horasTrabajadas, body.idTrabajo, body.idUsuario, body.geolocalizacionLatitud, body.geolocalizacionLongitud, idFichaje], function(error, results){
          // console.log(results);
          if(results.affectedRows > 0){
            resolve({
              message: "Fichaje modificado con éxito", result: body 
            })
          } else {
            reject({
              message: "No se ha podido modificar el fichaje", error: error
            })
          }
        })
      }
    })
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
          message:"Fichaje creado con éxito", usuarioCreado: body
        });
      }
    });
  });
}

