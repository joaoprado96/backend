// routes/fotosLugaresRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const fotosLugaresController = require('../controllers/fotosLugaresController');

// Rota para adicionar várias novas fotos
router.post('/fotos-lugares', upload.array('fotos', 10), fotosLugaresController.adicionarFotoLugar);

// Rota para verificar se um lugar já possui fotos
router.get('/fotos-lugares/verificar/:lugarId', fotosLugaresController.verificarFotos);

// Rota para deletar um LugarId e suas fotos
router.delete('/fotos-lugares/:lugarId', fotosLugaresController.deletarLugarEFotos);

module.exports = router;
