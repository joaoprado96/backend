const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para detalhes de acesso
const AcessoSchema = new Schema({
  idSessao: { type: String, required: true },
  dataHora: { type: Date, required: true },
  sistemaOperacional: String,
  tipoDispositivo: String,
  navegador: String,
  resolucaoTela: String,
  localizacao: {
    pais: String,
    cidade: String,
    latitude: Number,
    longitude: Number
  },
  eventos: [{
    tipo: String,
    dataHora: Date
  }]
});

module.exports = mongoose.model('Acesso', AcessoSchema);
