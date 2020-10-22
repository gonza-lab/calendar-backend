const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { fieldValidator } = require('../middlewares/field-validator');

const createEventValidators = [
  check('title', 'No envio un titulo valido').not().isEmpty(),
  check('start', 'No envio una fecha valida').custom(isDate),
  check('end', 'No envio una fecha valida').custom(isDate),
  fieldValidator,
];

module.exports = { createEventValidators };
