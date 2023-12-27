const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarioModel'); // Substitua pelo caminho correto do modelo User

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          // Defina um payload para o JWT (pode conter o ID do usuário e outros campos que você deseja incluir)
          const payload = {
            id: user._id,
            username: user.username
          };
  
          // Assine o token com uma chave secreta. Não se esqueça de armazenar a chave secreta em uma variável de ambiente.
          const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
          res.json({ message: 'Login bem-sucedido', token });
        } else {
          res.status(400).send('Credenciais inválidas');
        }
      } else {
        res.status(400).send('Credenciais inválidas');
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Verificar se já existe um usuário com o mesmo e-mail
      const userByEmail = await User.findOne({ email: email });
      if (userByEmail) {
        return res.status(400).send('E-mail já cadastrado.');
      }
  
      // Verificar se já existe um usuário com o mesmo nome de usuário
      const userByUsername = await User.findOne({ username: username });
      if (userByUsername) {
        return res.status(400).send('Nome de usuário já cadastrado.');
      }
  
      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 8);
  
      // Criação do novo usuário
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });
  
      // Salvar o novo usuário no banco de dados
      await newUser.save();
  
      // Responder com sucesso
      res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
      // Responder com o erro
      res.status(500).send(error);
    }
  };
  
  module.exports = {
    login, 
    register
  };