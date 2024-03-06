function errorHandler(err, req, res, next) {
  console.error(err); // Loguea el error para el registro interno

  // Verifica si el error es un error de HTTP conocido
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    // Para errores no manejados, devuelve un código 500
    res.status(500).send({ message: "Ocurrió un error inesperado." });
  }
}
module.exports = errorHandler;