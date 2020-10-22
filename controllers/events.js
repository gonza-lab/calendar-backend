const { request, response } = require('express');
const Evento = require('../models/Evento');

const getEvents = (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'getEvents',
  });
};

const createEvent = async (req = request, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventSaved = await evento.save();

    res.status(201).json({
      ok: true,
      evento: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrador',
    });
  }
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
