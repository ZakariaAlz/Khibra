const express = require('express');
const SubmissionController = require('../controllers/SubmissionController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, SubmissionController.createSubmission);
router.get('/', authenticate, SubmissionController.getSubmissions);

module.exports = router;
