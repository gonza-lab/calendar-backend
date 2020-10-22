const { Router } = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const { jwtValidator } = require('../middlewares/jwt-validator');
const { createEventValidators } = require('../validators/events-validators');

const router = Router();

/*
  ${host}/api/events 
*/

router.use(jwtValidator);

router.get('/', getEvents);

router.post('/', createEventValidators, createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
