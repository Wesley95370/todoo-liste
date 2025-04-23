const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());  // Pour pouvoir traiter les données en JSON

app.get('/', (req, res) => {
  res.send('API en cours de fonctionnement');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
