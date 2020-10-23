const Evento = require('../models/Evento');

const userValidator = async (req, res, next) => {
  try {
    const event = await Evento.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio para editar este documento',
      });
    }
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrado',
    });
  }
  next();
};

module.exports = { userValidator };
