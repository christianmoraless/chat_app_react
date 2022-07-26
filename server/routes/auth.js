const express = require('express');
const {singnup, login} = require('../controllers/auth.js');
const router = express.Router();

router.post('/singnup',singnup);
router.post('/login',login);

module.exports = router;