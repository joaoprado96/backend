// routes/lugaresRoutes.js
const express = require('express');
const router = express.Router();
const lugaresController = require('../controllers/lugaresController');
const verificarToken = require('../middleware/verificarToken');

// Rota para adicionar um novo lugar
router.post('/lugares', verificarToken.verificarToken, lugaresController.adicionarLugar);

// Nova rota para buscar lugares
router.get('/lugares', lugaresController.buscarLugares);


module.exports = router;
