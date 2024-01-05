require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const lugaresRoutes = require('./routes/lugaresRoutes');
const opcoesSairRoutes = require('./routes/opcoesSairRoutes');
const fotosLugaresRoutes = require('./routes/fotosLugaresRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const destaquesRoutes = require('./routes/destaquesRoutes');

const app = express();

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
