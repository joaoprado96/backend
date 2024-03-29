const express = require('express');
const router = express.Router();
const acessoController = require('../controllers/acessosController'); // Substitua './acessoController' pelo caminho correto do seu controlador

// Rota para adicionar um evento
router.post('/adicionar-evento', acessoController.adicionarEvento);

router.get('/sessoes-por-dia', acessoController.contarSessoesUnicasPorDia);

router.get('/sessoes-por-cidade', acessoController.contarSessoesUnicasPorCidade);

module.exports = router;
