// routes/fotosLugaresRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const fotosLugaresController = require('../controllers/fotosLugaresController');

// Rota para adicionar uma nova foto
router.post('/fotos-lugares', upload.single('imagem'), fotosLugaresController.adicionarFotoLugar);

module.exports = router;
