const { Router } = require('express');
const router = Router();

const { shortcode, getUrls, getUrl} = require('../controllers/urls.controller');

router.get('/urls/', getUrls);

router.post('/create/', shortcode);

router.get('/:shortUrl', getUrl);

module.exports = router;