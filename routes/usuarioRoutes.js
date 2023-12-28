// routes/lugaresRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController');
const rateLimit = require('../middleware/rateLimit'); // Importando o rate limiting


// Rota para adicionar um novo usuario
router.post('/register', rateLimit, userController.register);

// Nova rota para fazer loggin
router.post('/login', rateLimit, userController.login);


module.exports = router;
