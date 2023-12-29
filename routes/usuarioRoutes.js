// routes/lugaresRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController');
const rateLimit = require('../middleware/rateLimit'); // Importando o rate limiting


// Rota para adicionar um novo usuario
router.post('/register', rateLimit, userController.register);

// Nova rota para fazer loggin
router.post('/login', rateLimit, userController.login);

// Rota para obter informações de um usuário
router.get('/user/:username', rateLimit ,userController.getUserProfile);

// Rota para atualizar o perfil do usuário
router.put('/user/update/:username',rateLimit, userController.updateUserProfile);


module.exports = router;
