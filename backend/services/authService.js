const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

exports.signup = async ({ username, email, password }) => {
  // Email validation
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  // Password strength validation
  if (!passwordRegex.test(password)) {
    throw new Error('Password must be at least 8 characters long and include at least one special character');
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return { id: user.id, username: user.username, email: user.email };
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User does not exist");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: { id: user.id, username: user.username, email: user.email }
  };
};
