const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Asumiendo que el token viene en el encabezado de autorización como "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'No autorizado. No se encontró el token.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, 'unaClaveSecretaMuyCompleja12345');


    req.user = payload;

    next();
  } catch (error) {
    res.status(401).send({ message: 'No autorizado. Token inválido.' });
  }
};

module.exports = auth;