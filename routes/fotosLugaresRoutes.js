// routes/fotosLugaresRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const fotosLugaresController = require('../controllers/fotosLugaresController');
const verificarToken = require('../middleware/verificarToken');
const rateLimit = require('../middleware/rateLimit'); // Importando o rate limiting


// Rota para adicionar várias novas fotos
router.post('/fotos-lugares', rateLimit, upload.array('fotos', 10), verificarToken.verificarToken, fotosLugaresController.adicionarFotoLugar);

// Rota para verificar se um lugar já possui fotos
router.get('/fotos-lugares/verificar/:lugarId', fotosLugaresController.verificarFotos);

// Rota para obter todas as fotos de um determinado lugar
router.get('/fotos-lugares/:lugarId', fotosLugaresController.obterFotosPorLugar);

// Rota para obter a primeira foto de um determinado lugar
router.get('/primeira-foto-lugar/:lugarId', fotosLugaresController.obterPrimeiraFotoPorLugar);


// Rota para deletar um LugarId e suas fotos
router.delete('/fotos-lugares/:lugarId',rateLimit, verificarToken.verificarToken, fotosLugaresController.deletarLugarEFotos);

module.exports = router;
