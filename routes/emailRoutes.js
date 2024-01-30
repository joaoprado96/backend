const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');


// Rota para gerar uma nova senha e mandar por email:
router.post('/gerar-senha', emailController.sendEmail);


module.exports = router;
