// routes/fotosLugaresRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const fotosLugaresController = require('../controllers/fotosLugaresController');

// Rota para adicionar várias novas fotos
router.post('/fotos-lugares', upload.array('fotos', 10), fotosLugaresController.adicionarFotoLugar);

module.exports = router;
