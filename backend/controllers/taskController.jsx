// controllers/taskController.js
const db = require('../db');

// Créer une tâche
async function createTask(req, res) {
  const { title, description } = req.body;
  const userId = req.user.id;  // Utilisation du middleware pour obtenir l'ID de l'utilisateur

  try {
    const result = await db.query(
      'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );

    const newTask = result.rows[0];
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche', error: error.message });
  }
}

// Récupérer toutes les tâches
async function getTasks(req, res) {
  const userId = req.user.id;

  try {
    const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error: error.message });
  }
}

module.exports = { createTask, getTasks };
