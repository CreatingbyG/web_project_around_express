const express = require('express')
const app = express();
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const {PORT = 3000} = process.env;
const mongoose = require('mongoose');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '65961518bf2c3861f4099be4' // pega el _id del usuario de prueba que creamos en el paso anterior
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


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});
