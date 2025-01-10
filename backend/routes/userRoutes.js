const express = require('express');
const { getUsers, addUser } = require('../controllers/userController');

const router = express.Router();

router.get('/getusers', getUsers);
router.post('/createuser', addUser);

module.exports = router;
