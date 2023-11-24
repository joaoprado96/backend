// routes/opcoesSairRoutes.js
const express = require('express');
const router = express.Router();
const opcoesSairController = require('../controllers/opcoesSairController');

// Rota para adicionar novas opções
router.post('/opcoes-sair', opcoesSairController.adicionarOpcoesSair);

module.exports = router;
