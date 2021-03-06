const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

require('dotenv').config();

const server = express();

// Conexion a base de datos
dbConnection();

// CORS
server.use(
  cors({
    origin: 'https://calendar-app-g0nza.herokuapp.com',
  })
);

// Lectura y parseo del body
server.use(express.json());

// Rutas
server.use('/api/auth', require('./routes/auth'));
server.use('/api/events', require('./routes/events'));

server.listen(process.env.PORT, () => {
  console.log(`Servidor Online. Puerto: ${process.env.PORT}`);
});
