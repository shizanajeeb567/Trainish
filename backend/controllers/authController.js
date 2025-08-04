const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

exports.createUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await authService.signup({ email, password, username });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1d' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//for user login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.login({ email, password });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
