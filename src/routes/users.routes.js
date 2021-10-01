const { Router } = require('express');
const router = Router();

const { singup, singin, getUsers, logout} = require('../controllers/users.controller');

router.post("/users/singup", singup);

router.post("/users/singin", singin);

router.get('/users/', getUsers);

router.get('/users/logout', logout);

module.exports = router;