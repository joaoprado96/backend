// routes/lugaresRoutes.js
const express = require('express');
const router = express.Router();
const lugaresController = require('../controllers/lugaresController');
const verificarToken = require('../middleware/verificarToken');
const rateLimit = require('../middleware/rateLimit'); // Importando o rate limiting


// Rota para adicionar um novo lugar
router.post('/lugares', rateLimit, lugaresController.adicionarLugar);

// Nova rota para buscar lugares
router.get('/lugares', lugaresController.buscarLugares);

// Nova rota para buscar lugares
router.get('/lugares/:lugarId', lugaresController.buscarLugarPorId);

// Nova rota para atualizar o lugar
router.put('/lugares/:lugarId', lugaresController.ataulizarLugarPorId);


module.exports = router;
