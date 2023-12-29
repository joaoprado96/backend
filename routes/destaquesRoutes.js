// routes/fotosLugaresRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const destaquesController = require('../controllers/destaquesController');
const verificarToken = require('../middleware/verificarToken');
const rateLimit = require('../middleware/rateLimit'); // Importando o rate limiting


// Rota para adicionar várias novas fotos
router.post('/fotos-destaques', rateLimit, upload.array('fotos', 10), verificarToken.verificarToken, destaquesController.adicionarDestaque);

// Rota para deletar um LugarId e suas fotos
router.delete('/fotos-destaques/:lugarId',rateLimit, verificarToken.verificarToken, destaquesController.deletarLugarEFotos);

// Rota para verificar se um lugar já possui fotos
router.get('/fotos-destaques/verificar/:lugarId', destaquesController.verificarFotos);

// Rota para obter todas as fotos de um determinado lugar
router.get('/fotos-destaques/:lugarId', destaquesController.obterFotosPorLugar);

// Rota pra trazer todos os lugares que estão cadastrados como Destaques
router.get('/destaques/lugares', rateLimit, destaquesController.buscarLugares);

module.exports = router;
