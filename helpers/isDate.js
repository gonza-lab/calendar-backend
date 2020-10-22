const moment = require('moment');

const isDate = (value) => {
  if (!value) {
    return false;
  } else if (moment(value).isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
