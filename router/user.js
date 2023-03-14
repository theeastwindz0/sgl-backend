const UserControllers = require('../controller/user');
const express = require('express');
const router = express.Router();

router.post('/user/register', UserControllers.register);
router.post('/user/login', UserControllers.login);

module.exports = router;
