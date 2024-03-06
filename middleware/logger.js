const winston = require('winston');
const path = require('path');

// Crear un logger
const logger = winston.createLogger({
  level: 'info', // Nivel mínimo para registrar
  format: winston.format.json(), // Formato de los registros
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../request.log'), level: 'info' }),
    new winston.transports.File({ filename: path.join(__dirname, '../error.log'), level: 'error' }),
  ],
});

module.exports = logger;