const express = require('express');
const posts = require('./posts');
const users = require('./users')
const router = express.Router();


router.use('/', posts);
router.use('/', users)

module.exports = router;