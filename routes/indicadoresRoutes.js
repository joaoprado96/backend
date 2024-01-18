// routes/fotosLugaresRoutes.js
const express = require('express');
const router = express.Router();
const indicadoresController = require('../controllers/indicadoresController');
const verificarToken = require('../middleware/verificarToken');
const rateLimit = require('../middleware/rateLimit'); // Importando o rate limiting

router.post('/atualizarIndicador/:LugarId/:nomeIndicador', rateLimit ,async (req, res) => {
    try {
      await indicadoresController.atualizarIndicador(req.params.LugarId, req.params.nomeIndicador, req.body);
      res.status(200).send('Indicador atualizado com sucesso.');
    } catch (error) {
      console.error('Erro na rota ao atualizar indicador:', error);
      res.status(500).send('Erro ao atualizar o indicador.');
    }
  });
  

module.exports = router;
