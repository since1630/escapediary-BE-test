const express = require('express');
const posts = require('./posts');
const users = require('./users')
const router = express.Router();


router.use('/', users);
router.use('/posts', posts);


module.exports = router;