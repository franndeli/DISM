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

      console.log(req.query);

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
        fechaInicioMenos12Horas.setHours(fechaInicioMenos12Horas.getHours() - req.query.horasMenos);

        query += ' AND FechaHoraEntrada BETWEEN ? AND ?';
        queryParams.push(fechaInicioMenos12Horas.toISOString(), fechaInicio);
      }

      if (fechaFin) {
        query += ' AND FechaHoraSalida = ?';
        queryParams.push(fechaFin);
      }

      if (req.query.fechaFinIsNull === true) {
        query += ' AND FechaHoraSalida IS NULL';
      }

      if(req.query.fechaInicio === true){
        query += ' AND FechaHoraEntrada BETWEEN ? AND ?';
      }

      if(req.query.fechaFin === true){
        query += ' AND FechaHoraSalida BETWEEN ? AND ?';
      }

      db.query(query, queryParams, async function(error, results) {
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
          const fichajesActualizados = [];

          // Verificar cada fichaje para ver si cumple la condición de actualizar
          for (let fichaje of results) {
            if (fichaje.FechaHoraSalida === null) {
              const fechaHoraEntrada = new Date(fichaje.FechaHoraEntrada);
              const fechaActual = new Date();
              const diferenciaHoras = (fechaActual - fechaHoraEntrada) / (1000 * 60 * 60);

              if (diferenciaHoras >= 12) {
                // Configura la FechaHoraSalida a 12 horas después de FechaHoraEntrada
                const fechaHoraSalida = new Date(fechaHoraEntrada);
                fechaHoraSalida.setHours(fechaHoraSalida.getHours() + 12);

                const horasTrabajadas = 12;

                // Llamada para actualizar el fichaje con el método PUT
                await exports.fichajesIdFichajePUT(req, {
                  fechaHoraEntrada: fichaje.FechaHoraEntrada,
                  fechaHoraSalida: fechaHoraSalida.toISOString(),
                  horasTrabajadas: horasTrabajadas,
                  idTrabajo: fichaje.idTrabajo,
                  idUsuario: fichaje.idUsuario,
                  geolocalizacionLatitud: fichaje.GeolocalizacionLatitud,
                  geolocalizacionLongitud: fichaje.GeolocalizacionLongitud
                }, fichaje.idFichaje);

                // Actualizar el objeto en resultados
                fichaje.FechaHoraSalida = fechaHoraSalida.toISOString();
                fichaje.HorasTrabajadas = horasTrabajadas;
                fichajesActualizados.push(fichaje);
              }
            }
          }

          resolve({
            message: "Fichajes obtenidos y actualizados si correspondía",
            body: results,
            actualizados: fichajesActualizados
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};


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
          // console.log(results);
          const idFichaje = results.insertId;
          // console.log(body);
          const fechaHoraEntrada = new Date(body.fechaHoraEntrada);
          // console.log(fechaHoraEntrada);
          const papa = new Date();
          const fechaActual = papa.setHours(papa.getHours());

          const diferenciaHoras = (fechaActual - fechaHoraEntrada) / (1000 * 60 * 60);
          // console.log(diferenciaHoras);

          if (diferenciaHoras > 12) {
            const fechaHoraSalida = new Date(fechaHoraEntrada);
            fechaHoraSalida.setHours(fechaHoraSalida.getHours() + 12);

            const horasTrabajadas = 12;

            exports.fichajesIdFichajePUT(req, {
              fechaHoraEntrada: body.fechaHoraEntrada,
              fechaHoraSalida: fechaHoraSalida.toISOString(),
              horasTrabajadas: horasTrabajadas,
              idTrabajo: body.idTrabajo,
              idUsuario: body.idUsuario,
              geolocalizacionLatitud: body.geolocalizacionLatitud,
              geolocalizacionLongitud: body.geolocalizacionLongitud
            }, idFichaje).then((updateResponse) => {
              resolve({
                message: "Fichaje creado y actualizado con éxito",
                usuarioCreado: body,
                updateResult: updateResponse
              });
            }).catch((updateError) => {
              reject({
                message: "Fichaje creado pero hubo un error en la actualización",
                error: updateError
              });
            });
          } else {
            resolve({
              message: "Fichaje creado con éxito",
              usuarioCreado: body,
              tokenInfo: tokenVerification
            });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

exports.fichajesIdFichajeGET = function(req, idUsuario, fechaInicio) {
  return new Promise(async (resolve, reject) => {

    const { idUsuario, fechaInicio } = req.query; // Extraer los parámetros de req.query

    console.log('idUsuario:', idUsuario);
    console.log('fechaInicio:', fechaInicio);

    try {
      const tokenVerification = await verifyToken(req);

      let query = 'SELECT fichajes.*, trabajos.nombre AS trabajoNombre FROM fichajes LEFT JOIN trabajos ON fichajes.idTrabajo = trabajos.idTrabajo WHERE 1=1';
      const queryParams = [];

      if (idUsuario) {
        query += ' AND idUsuario = ?';
        queryParams.push(idUsuario);
      }

      if (fechaInicio) {
        const startOfDay = new Date(fechaInicio);
        startOfDay.setHours(0, 0, 0, 0);
      
        const endOfDay = new Date(fechaInicio);
        endOfDay.setHours(23, 59, 59, 999);
      
        query += ' AND FechaHoraEntrada BETWEEN ? AND ?';
        queryParams.push(startOfDay.toISOString(), endOfDay.toISOString());
      }
      

      db.query(query, queryParams, function(error, results) {
        if (error) {
          reject({
            message: "Error al obtener el fichaje",
            error: error
          });
        } else if (results.length > 0) {
          resolve({
            message: "Fichaje obtenido con éxito",
            body: results[0],
            tokenInfo: tokenVerification
          });
        } else {
          reject({
            message: "Fichaje no encontrado con usuario ID " + idUsuario,
            error: error
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

