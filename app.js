const express = require('express')
const app = express();
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const {PORT = 3000} = process.env;
const mongoose = require('mongoose');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '65961518bf2c3861f4099be4'
  };
  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);



mongoose.connect('mongodb://127.0.0.1:27017/aroundb', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Conexion exitosa a la base de datos');
});

app.use((err, req, res, next) => {
  // Error 400 - Datos inválidos
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Datos inválidos' });
  }

  // Error 404 - No encontrado
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(404).send({ message: 'Recurso no encontrado' });
  }

  // Error 500 - Error interno del servidor
  // Este es un error genérico para cualquier otro tipo de error no manejado específicamente
  res.status(500).send({ message: 'Error interno del servidor' });
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

