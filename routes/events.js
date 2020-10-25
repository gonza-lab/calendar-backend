const { Router } = require('express');
const cors = require('cors');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const { jwtValidator } = require('../middlewares/jwt-validator');
const { userValidator } = require('../middlewares/user-validator');
const { createEventValidators } = require('../validators/events-validators');

const router = Router();

/*
  ${host}/api/events 
*/

router.use(jwtValidator);
router.use(
  cors({
    origin: 'https://mern-calendar-g0nza.herokuapp.com',
    optionsSuccessStatus: 200,
  })
);

router.get('/', getEvents);

router.post('/', createEventValidators, createEvent);

router.put('/:id', [createEventValidators, userValidator], updateEvent);

router.delete('/:id', userValidator, deleteEvent);

module.exports = router;
