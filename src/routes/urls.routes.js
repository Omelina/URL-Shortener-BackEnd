const { Router } = require('express');
const router = Router();

const { createShortcode, getUrls} = require('../controllers/urls.controller');

router.get('/urls/', getUrls);

module.exports = router;