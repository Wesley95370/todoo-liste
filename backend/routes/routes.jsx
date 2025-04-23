// routes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('./controllers/authController');
const { createTask, getTasks } = require('./controllers/taskController');
const authenticateToken = require('./middleware/authMiddleware');

// Routes d'authentification
router.post('/register', register);
router.post('/login', login);

// Routes pour les tâches (protégées par le middleware JWT)
router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getTasks);

module.exports = router;
