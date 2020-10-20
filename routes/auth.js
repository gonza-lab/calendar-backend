const { Router } = require('express');
const { createUser, renewToken, loginUser } = require('../controllers/auth');
const router = Router();

/*
  ${host}/api/auth
*/

router.post('/register', createUser);

router.post('/', loginUser);

router.get('/renew', renewToken);

module.exports = router;
