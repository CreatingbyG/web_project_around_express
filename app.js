const express = require('express')
const app = express();
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const {PORT = 3000} = process.env;
const mongoose = require('mongoose');

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));


