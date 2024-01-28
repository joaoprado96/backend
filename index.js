// Framework para a aplicação Code Runer
require('dotenv').config();
const crypto = require('crypto');

// Gerando informações uteis de ambiente
process.env.BASEDIR = __dirname
process.env.NODE_ENV = 'production'
process.env.JWT_SECRET_KEY = crypto.randomBytes(256).toString('hex');

const express = require('express');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const lugaresRoutes = require('./routes/lugaresRoutes');
const opcoesSairRoutes = require('./routes/opcoesSairRoutes');
const fotosLugaresRoutes = require('./routes/fotosLugaresRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const destaquesRoutes = require('./routes/destaquesRoutes');
const faleconoscoRoutes = require('./routes/faleconoscoRoutes');
const indicadoresRoutes = require('./routes/indicadoresRoutes');
const acessoRoutes = require('./routes/acessoRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joao@pradoautomacao.com',
    pass: 'Eletrica16!'
  }
});

let mailOptions = {
  from: 'joao@pradoautomacao.com',
  to: 'joaoprado@outlook.com.br',
  subject: 'Assunto do E-mail',
  text: 'Corpo do e-mail aqui.'
};

// Conectar ao banco de dados
connectDB();

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Servindo arquivos estáticos
app.use(express.static('public'));

// Definindo as rotas da API
app.use('/api', lugaresRoutes);
app.use('/api', opcoesSairRoutes);
app.use('/api', fotosLugaresRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', destaquesRoutes);
app.use('/api', faleconoscoRoutes);
app.use('/api', indicadoresRoutes);
app.use('/api', acessoRoutes);
app.use('/api', sessionRoutes);

app.get('/', (req, res) => {
    res.redirect('/home.html');
  });
  
// Rota de fallback para servir qualquer página dentro de 'public' ou 'notfound.html' se não existir
app.use((req, res, next) => {
    let filePath = path.join(__dirname, 'public', req.path);

    // Tenta adicionar '.html' se o arquivo não for encontrado
    if (!fs.existsSync(filePath)) {
        filePath += '.html';
    }

    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        res.sendFile(filePath);
    } else {
        res.status(404).sendFile(path.join(__dirname, 'public', 'notfound.html'));
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
