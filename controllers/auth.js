const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo',
      });
    } else {
      usuario = new Usuario(req.body);

      // Encriptacion de contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      await usuario.save();

      // Generar JWT
      const token = await createJWT(usuario.id, usuario.name);

      res.status(201).json({
        ok: true,
        msg: 'Register',
        id: usuario.id,
        name: usuario.name,
        token,
      });
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Porfavor, hable con el administrador',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
      return res.status(400).json({
        ok: false,
        msg: 'Email o contraseña incorrecto',
      });
    }

    // Generar JWT
    const token = await createJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      id: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Porfavor, hable con el administrador',
    });
  }
};

const renewToken = async (req, res) => {
  const { uid, name } = req;

  const token = await createJWT(uid, name);

  res.json({
    ok: true,
    msg: 'Renew',
    token,
  });
};

module.exports = { createUser, renewToken, loginUser };
