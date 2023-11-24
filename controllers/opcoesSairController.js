const OpcoesSair = require('../models/opcoesSairModel');

exports.adicionarOpcoesSair = async (req, res) => {
    const {
        opcoes_cidade, opcoes_bairro, opcoes_regiao, opcoes_entrada, opcoes_estacao,
        opcoes_estrelas, opcoes_avaliacao, opcoes_acessibilidade, opcoes_musica, opcoes_estacionamento,
        opcoes_cover, opcoes_kids, opcoes_estilo_musical, opcoes_cozinha, opcoes_local, opcoes_preco,
        opcoes_tipo_evento, opcoes_hobby, opcoes_ambiente, opcoes_cartao, opcoes_dias,
        opcoes_hora, opcoes_pet, opcoes_estilo_servico, opcoes_glutenfree, opcoes_lactosefree
    } = req.body;

    try {
        const novasOpcoes = new OpcoesSair({
            opcoes_cidade, opcoes_bairro, opcoes_regiao, opcoes_entrada, opcoes_estacao,
            opcoes_estrelas, opcoes_avaliacao, opcoes_acessibilidade, opcoes_musica, opcoes_estacionamento,
            opcoes_cover, opcoes_kids, opcoes_estilo_musical, opcoes_cozinha, opcoes_local, opcoes_preco,
            opcoes_tipo_evento, opcoes_hobby, opcoes_ambiente, opcoes_cartao, opcoes_dias,
            opcoes_hora, opcoes_pet, opcoes_estilo_servico, opcoes_glutenfree, opcoes_lactosefree
        });

        await novasOpcoes.save();
        res.status(201).json(novasOpcoes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Nova função para buscar opções
exports.buscarOpcoesSair = async (req, res) => {
    try {
        const opcoes = await OpcoesSair.find();
        res.status(200).json(opcoes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
