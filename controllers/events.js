const { request, response } = require('express');

const getEvents = (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'getEvents',
  });
};

const createEvent = (req = request, res = response) => {
  res.status(201).json({
    ok: true,
    msg: 'createEvent',
  });
};

const updateEvent = (req = request, res = response) => {
  const { id } = req.params;

  res.status(200).json({
    ok: true,
    msg: 'updateEvent',
  });
};

const deleteEvent = (req = request, res = response) => {
  const { id } = req.params;

  res.status(200).json({
    ok: true,
    msg: 'deleteEvent',
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
