// routes/fotosLugaresRoutes.js
const express = require('express');
const router = express.Router();
const faleconoscoController = require('../controllers/faleconoscoController');
const verificarToken = require('../middleware/verificarToken');
const rateLimit = require('../middleware/rateLimit'); // Importando o rate limiting

// Rota para adicionar várias novas fotos
router.post('/incluir-sugestao', rateLimit, faleconoscoController.adicionarSugestao);

module.exports = router;
