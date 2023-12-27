// routes/fotosLugaresRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const fotosLugaresController = require('../controllers/fotosLugaresController');
const verificarToken = require('../middleware/verificarToken');

// Rota para adicionar várias novas fotos
router.post('/fotos-lugares', upload.array('fotos', 10), verificarToken.verificarToken, fotosLugaresController.adicionarFotoLugar);

// Rota para verificar se um lugar já possui fotos
router.get('/fotos-lugares/verificar/:lugarId', fotosLugaresController.verificarFotos);

// Rota para obter todas as fotos de um determinado lugar
router.get('/fotos-lugares/:lugarId', fotosLugaresController.obterFotosPorLugar);

// Rota para deletar um LugarId e suas fotos
router.delete('/fotos-lugares/:lugarId', fotosLugaresController.deletarLugarEFotos);

module.exports = router;
