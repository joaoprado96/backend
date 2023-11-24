// index.js
const express = require('express');
const connectDB = require('./config/db');
const lugaresRoutes = require('./routes/lugaresRoutes');
const opcoesSairRoutes = require('./routes/opcoesSairRoutes');
const fotosLugaresRoutes = require('./routes/fotosLugaresRoutes');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Definindo as rotas
app.use('/api', lugaresRoutes);
app.use('/api', opcoesSairRoutes);
app.use('/api', fotosLugaresRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
