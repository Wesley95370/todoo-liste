const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Connexion à PostgreSQL réussie'))
  .catch((err) => console.error('Erreur de connexion à PostgreSQL', err));

module.exports = client;
