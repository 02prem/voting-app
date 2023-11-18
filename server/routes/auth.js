const router = require('express').Router(); // import express and create instance of Router
const handle = require('../handlers');

router.post('./register', handle.register);  // route for POST request to './register'
router.post('./login');

module.exports = router;