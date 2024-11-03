// Para controlar los tokens de los usuarios

const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const db = require('../utils/db');

const login = (req, res) => {
    const { usuario, clave } = req.body;

    console.log(req.body);
  
    // Verificar si el usuario existe en la base de datos
    const query = 'SELECT * FROM usuarios WHERE Usuario = ?';

    db.query(query, [usuario], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error del servidor' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const user = results[0];
  
      // Verificar la contraseña
      const passwordIsValid = clave == user.Clave;

      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      // Crear el token JWT
      const token = jwt.sign({ id: user.idUsuario, role: user.Tipo }, 'dd14a8f2da2a53787f208f39555efef9e237c3dedb58945cd59f2f2574e83007', {
        expiresIn: 86400 // 24 horas
      });
  
      if (token) {
        // Enviar el token y los datos del usuario en la respuesta
        res.status(200).json({
          id: user.idUsuario,
          usuario: user.Usuario,
          nombre: user.Nombre,
          role: user.Tipo,
          token: token
        });
      } else {
        res.status(400).json({ message: 'Ha ocurrido un problema con el token' })
      }
    });
  };

  // Middleware para verificar el token
  const verifyToken = (req) => {
    return new Promise((resolve, reject) => {
      const token = req.headers['authorization'];
      
      if (!token) {
        console.error('Token no proporcionado');
        return reject({ message: 'No se proporcionó un token' });
      }
  
      // Verifica el token sin prefijo
      jwt.verify(token, 'dd14a8f2da2a53787f208f39555efef9e237c3dedb58945cd59f2f2574e83007', (err, decoded) => {
        if (err) {
          console.error('Token inválido', err);
          return reject({ message: 'Token inválido', error: err });
        }
  
        console.log('Token correcto');
        
        req.userId = decoded.id;
        req.userRole = decoded.role;
        resolve({ message: 'Token verificado', userId: decoded.id, role: decoded.role });
      });
    });
  };
  
  
  module.exports = { login, verifyToken };

