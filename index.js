const express = require('express');
require('dotenv').config();

const server = express();
const PORT = 3001;

// Directorio publico
server.use(express.static('public'));

// Rutas
server.use('/api/auth', require('./routes/auth'));

server.listen(process.env.PORT, () => {
  console.log(`Servidor montado en ${process.env.PORT}`);
});
