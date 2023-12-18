

# 
Proyecto Express

Este proyecto es una aplicación web construida con Node.js y Express.js. Se trata de una API REST que proporciona rutas para interactuar con recursos de usuarios y tarjetas.
Tecnologías utilizadas

- Node.js: Es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. Nos permite ejecutar código JavaScript en el servidor.

- Express.js: Es un marco de aplicación web para Node.js, diseñado para construir aplicaciones web y API. Es relativamente minimalista y flexible, proporcionando un conjunto robusto de características para las aplicaciones web y móviles.
Estructura del proyecto

El archivo principal de la aplicación es app.js. Aquí es donde se configura la aplicación y se establecen las rutas.

Las rutas para los recursos de usuarios y tarjetas se definen en los archivos ./routes/users y ./routes/cards respectivamente.
Rutas

- /users: Esta ruta se utiliza para interactuar con los recursos de los usuarios.

- /cards: Esta ruta se utiliza para interactuar con los recursos de las tarjetas.
Ejecución del servidor

El servidor se ejecuta en el puerto definido por la variable de entorno PORT. Si no se define, el puerto predeterminado es 3000. Cuando el servidor está en funcionamiento, se puede acceder a él en http://localhost:${PORT}.

- Manejo de errores

Si se solicita un recurso que no existe, la aplicación devuelve un error 404 con el mensaje 'Recurso solicitado no encontrado'.
