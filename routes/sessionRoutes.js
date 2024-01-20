const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');


// Rota para obter um token de sessão
router.get('/generate-token', sessionController.generateTokenController);

// Rota para validar o token
router.get('/validate-token', sessionController.validateTokenController);

module.exports = router;
