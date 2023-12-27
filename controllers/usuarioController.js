const bcrypt = require('bcryptjs');
const User = require('../models/usuarioModel'); // Substitua pelo caminho correto do modelo User

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isMatch = user && await bcrypt.compare(req.body.password, user.password);

    if (isMatch) {
      res.send('Login bem-sucedido');
    } else {
      res.status(400).send('Credenciais inválidas');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const register = async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  module.exports = {
    login, 
    register
  };