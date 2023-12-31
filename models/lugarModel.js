const mongoose = require('mongoose');

const lugarSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    rua: String,
    cep: String,
    cnpj: String,
    cidade: String,
    bairro: String,
    regiao: String,
    entrada: String,
    latitude: Number,
    longitude: Number,
    linha_metro: [String],
    estacao: [String],
    estrelas: Number,
    avaliacao_clientes: Number,
    avaliacao_pagina: Number,
    descricao_pagina: String,
    link_pagina: String,
    midia_pagina: String,
    acessibilidade: [String],
    musica: String,
    estacionamento: String,
    cover: String,
    kids: String,
    website: String,
    premio: [String],
    estilo_musical: [String],
    cozinha: [String],
    local: [String],
    preco: Number,
    tipo_evento: [String],
    hobby: [String],
    ambiente: [String],
    cartao: [String],
    dias: [String],
    nivel: Number,
    link_cardapio: String,
    horarios_funcionamento: {},
    pet: String,
    estilo_servico: [String],
    glutenfree: String,
    lactosefree: String
});

module.exports = mongoose.model('Lugar', lugarSchema);
