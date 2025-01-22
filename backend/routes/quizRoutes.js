const express = require('express');
const { completeQuiz, logLoginActivity } = require('../controllers/quizController');

const router = express.Router();
// create complete quiz and login activity routes
router.post('/complete', completeQuiz);
router.post('/loginactivity', logLoginActivity);
module.exports = router;
