// routes/lugaresRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController');

// Rota para adicionar um novo usuario
router.post('/register', userController.register);

// Nova rota para fazer loggin
router.post('/login', userController.login);


module.exports = router;
