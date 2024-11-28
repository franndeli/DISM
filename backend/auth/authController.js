// Para controlar los tokens de los usuarios

const jwt = require('jsonwebtoken');

const db = require('../utils/db');

async function getApiKey(req, res) {
  return new Promise((resolve, reject) => {
    try {
      const query = 'SELECT * FROM apikey WHERE idKey = 1';

      db.query(query, (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error del servidor' });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: 'API Key no encontrada' });
        }

        const apiKey = results[0].NombreKey;

        resolve(apiKey);
      });
    } catch (error) {
      reject(error);
    }
  });
}

const login = async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const apiKey = await getApiKey(req, res);
    
    const query = 'SELECT * FROM usuarios WHERE Usuario = ?';

    db.query(query, [usuario], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error del servidor' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const user = results[0];

      const passwordIsValid = clave == user.Clave;

      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: user.idUsuario, role: user.Tipo }, apiKey, {
        expiresIn: 86400 // 24 horas
      });

      if (token) {
        res.status(200).json({
          id: user.idUsuario,
          usuario: user.Usuario,
          nombre: user.Nombre,
          role: user.Tipo,
          token: token
        });
      } else {
        res.status(400).json({ message: 'Ha ocurrido un problema con el token' });
      }
    });
  } catch (error) {
    console.error('Error fetching API key:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

  // Middleware para verificar el token
  const verifyToken = (req) => {
    return new Promise((resolve, reject) => {
      const token = req.headers['authorization'];
      
      if (!token) {
        console.error('Token no proporcionado');
        return reject({ message: 'No se proporcionó un token' });
      }
      
      // console.log(token);

      jwt.verify(token, 'dd14a8f2da2a53787f208f39555efef9e237c3dedb58945cd59f2f2574e83007', (err, decoded) => {
        if (err) {
          console.error('Token inválido', err);
          return reject({ message: 'Token inválido', error: err });
        }
  
        // console.log('Token correcto');
        
        req.userId = decoded.id;
        req.userRole = decoded.role;
        resolve({ message: 'Token verificado', userId: decoded.id, role: decoded.role });
      });
    });
  };
  
  
  module.exports = { login, verifyToken, getApiKey };

