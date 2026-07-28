const express = require('express');
const router = express.Router();
const { generateWebsite } = require('../controllers/generateController');

router.post('/', generateWebsite);

module.exports = router;