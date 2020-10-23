const { request, response } = require('express');
const Evento = require('../models/Evento');

const getEvents = async (req = request, res = response) => {
  const eventos = await Evento.find().populate('user', 'name');

  res.status(200).json({
    ok: true,
    msg: 'getEvents',
    eventos,
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

const deleteEvent = async (req = request, res = response) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);

    res.status(400).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const updateEvent = async (req = request, res = response) => {
  try {
    const eventUpdated = await Evento.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        user: req.uid,
      },
      { new: true }
    );

    res.status(400).json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
