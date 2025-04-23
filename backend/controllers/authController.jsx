// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');  // Assure-toi que tu as une connexion à ta base de données ici

// Inscription d'un utilisateur
async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    
    const newUser = result.rows[0];
    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
}

// Connexion d'un utilisateur
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
}

module.exports = { register, login };
