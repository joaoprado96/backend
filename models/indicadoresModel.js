const mongoose = require('mongoose');

const indicadorSchema = new mongoose.Schema({
  data: String,
  valor: Number
});

const estabelecimentoSchema = new mongoose.Schema({
  LugarId: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  indicadores: {
    acessoDetalhes: [indicadorSchema],
    compartilhou: [indicadorSchema],
    clicouLocalizacao: [indicadorSchema],
    clicouCardapio: [indicadorSchema]
  },
  indicadores_mensais: {
    acessoDetalhes: [indicadorSchema],
    compartilhou: [indicadorSchema],
    clicouLocalizacao: [indicadorSchema],
    clicouCardapio: [indicadorSchema]
  }
});


module.exports = mongoose.model('estabelecimento', estabelecimentoSchema);
