const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarioModel'); // Substitua pelo caminho correto do modelo User
const emailController = require('../controllers/emailController'); // Importe o controlador de e-mail
const crypto = require('crypto');

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
          const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  
          res.json({ message: 'Login bem-sucedido', token, currentUser: username });
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

  const getUserProfile  = async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username: username });
      if (!user) {
          return res.status(404).send('Usuário não encontrado');
      }
      res.json(user);
    } catch (error) {
      res.status(500).send('Erro ao buscar perfil do usuário');
    }
  };

  const register = async (req, res) => {
    const { username, email, nome, tipoUsuario, cpf, cnpj } = req.body;

    // Gere uma senha aleatória
     const password = crypto.randomBytes(6).toString('hex');
  
    // Lista expandida de campos opcionais
    const camposOpcionais = [
      'endereco', 'dataNascimento', 'sexo', 'genero', 'telefone', 'fotoPerfil',
      'role', 'statusConta', 'preferencias', 'tokenSeguranca', 'enderecoIP',
      'biografia', 'redesSociais', 'nacionalidade', 'preferenciasNotificacao',
      'dataAtualizacaoPerfil'
    ];
  
    // Construindo o objeto do usuário com campos obrigatórios
    const dadosUsuario = {
      username,
      email,
      password: await bcrypt.hash(password, 8), // Hash da senha
      nome,
      tipoUsuario,
      cpf: tipoUsuario === 'fisica' ? cpf : undefined,
      cnpj: tipoUsuario === 'juridica' ? cnpj : undefined
    };
  
    // Adicionando campos opcionais, se existirem
    camposOpcionais.forEach(campo => {
      if (req.body[campo]) {
        dadosUsuario[campo] = req.body[campo];
      }
    });
  
    try {
      // Verificações de unicidade para email e username
      if (await User.findOne({ email })) {
        return res.status(400).send('E-mail já cadastrado.');
      }
      if (await User.findOne({ username })) {
        return res.status(400).send('Nome de usuário já cadastrado.');
      }
  
      // Criação do novo usuário
      const newUser = new User(dadosUsuario);
      await newUser.save();
      
    // Dados a serem passados no corpo da solicitação para a função sendEmail
    const emailData = {
      email: email, // Email do usuário recém-registrado
      nome: nome, // Nome do usuário recém-registrado
      senha:password,
      usuario: username
    };

    // Envie um e-mail de boas-vindas após o registro
    await emailController.sendEmail(emailData);

  
      // Responder com sucesso
      res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
      // Responder com o erro
      res.status(500).send(error);
    }
  };
  
  
  const updateUserProfile = async (req, res) => {
    const username = req.params.username;
    const updateData = req.body;

    // Remover campos que não devem ser atualizados
    delete updateData.email;
    delete updateData.password;
    delete updateData.username;

    // Definir a data e hora de atualização do perfil
    updateData.dataAtualizacaoPerfil = new Date();

    try {
        // Atualizar o usuário no banco de dados
        const updatedUser = await User.findOneAndUpdate(
            { username: username }, 
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send('Erro ao atualizar perfil do usuário');
    }
};


// Função para redefinir a senha
const reset = async (req, res) => {
  const { email, username } = req.body;

  try {
    // Verifique se o usuário existe
    const user = await User.findOne({ email, username });

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    // Gere uma nova senha aleatória
    const newPassword = crypto.randomBytes(6).toString('hex');

    // Atualize a senha do usuário no banco de dados
    user.password = await bcrypt.hash(newPassword, 8);
    await user.save();

    // Envie a nova senha por email
    await emailController.resetPassword(email, user.nome, newPassword);

    // Responder com sucesso
    res.status(200).send('Senha redefinida com sucesso. Verifique seu e-mail para a nova senha.');
  } catch (error) {
    // Responder com o erro
    res.status(500).send(error);
  }
};

  
  module.exports = {
    login, 
    register,
    getUserProfile,
    updateUserProfile,
    reset
  };