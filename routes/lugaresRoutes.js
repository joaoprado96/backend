// routes/lugaresRoutes.js
const express = require('express');
const router = express.Router();
const lugaresController = require('../controllers/lugaresController');

// Rota para adicionar um novo lugar
router.post('/lugares', lugaresController.adicionarLugar);

// Nova rota para buscar lugares
router.get('/lugares', lugaresController.buscarLugares);


module.exports = router;
