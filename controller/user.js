const User = require('../model/user');
const jwt = require('jsonwebtoken');
const secret = "dabjfbaoebfoqbefbquwfbauboadbfvaoifnoanfoanidfbqucnaisuhfvw9udcq9uegfqtwdbxy08qj,w0r26;";

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: '365d',
    });
    res.status(201).json({ user, token, message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);
    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: '365d',
    });
    res.status(200).json({ user, token, message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
