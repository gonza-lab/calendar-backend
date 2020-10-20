const createUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'Register',
  });
};

const loginUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'Login',
  });
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: 'Renew',
  });
};

module.exports = { createUser, renewToken, loginUser };
