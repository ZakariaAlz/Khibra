const express = require('express');
const TaskController = require('../controllers/TaskController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, TaskController.createTask);
router.get('/', TaskController.getTasks);

module.exports = router;
