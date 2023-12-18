const express = require('express')
const app = express();
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const {PORT = 3000} = process.env

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
