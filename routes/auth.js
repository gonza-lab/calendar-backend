const { Router } = require('express');
const cors = require('cors');
const { check } = require('express-validator');

const { createUser, renewToken, loginUser } = require('../controllers/auth');

const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

/*
  ${host}/api/auth
*/

router.use(
  cors({
    // origin: 'https://mern-calendar-g0nza.herokuapp.com',
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

router.post(
  '/register',
  [
    check('email', 'No envio un email valido').isEmail(),
    check('name', 'Debe enviar un nombre de al menos 5 caracteres').isLength({
      min: 5,
    }),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Debe enviar una contraseña de al menos 5 caracteres')
      .matches(/\d/)
      .withMessage('La contraseña debe contener un numero'),
    fieldValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'No envio un email valido').isEmail(),
    check('password')
      .isLength({ min: 5 })
      .withMessage('Debe enviar una contraseña de al menos 5 caracteres'),
    fieldValidator,
  ],
  loginUser
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
