const express = require('express');
const RankingController = require('../controllers/RankingController');

const router = express.Router();

router.get('/', RankingController.getRankings);

module.exports = router;
