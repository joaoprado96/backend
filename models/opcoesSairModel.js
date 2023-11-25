const mongoose = require('mongoose');

const opcoesSchema = new mongoose.Schema({
    opcoes_cidade: [String],
    opcoes_bairro: [String],
    opcoes_regiao: [String],
    opcoes_entrada: [String],
    opcoes_estacao: [String],
    opcoes_estrelas: [Number],
    opcoes_avaliacao_clientes: [Number],
    opcoes_avaliacao_pagina: [Number],
    opcoes_acessibilidade: [String],
    opcoes_musica: [String],
    opcoes_estacionamento: [String],
    opcoes_cover: [String],
    opcoes_kids: [String],
    opcoes_estilo_musical: [String],
    opcoes_cozinha: [String],
    opcoes_local: [String],
    opcoes_preco: [Number],
    opcoes_tipo_evento: [String],
    opcoes_hobby: [String],
    opcoes_ambiente: [String],
    opcoes_cartao: [String],
    opcoes_dias: [String],
    opcoes_hora: [String],
    opcoes_pet: [String],
    opcoes_estilo_servico: [String],
    opcoes_glutenfree: [String],
    opcoes_lactosefree: [String],
});

module.exports = mongoose.model('OpcoesSair', opcoesSchema);
