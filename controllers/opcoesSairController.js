const OpcoesSair = require('../models/opcoesSairModel');

exports.adicionarOpcoesSair = async (req, res) => {
    const {
        opcoes_cidades, opcoes_bairro, opcoes_regiao, opcoes_entrada, opcoes_estacao,
        opcoes_estrelas, opcoes_avaliacao, opcoes_acessibilidade, opcoes_musica, opcoes_estacionamento,
        opcoes_cover, opcoes_kids, opcoes_musical, opcoes_cozinha, opcoes_local, opcoes_preco,
        opcoes_tipo_evento, opcoes_hobby, opcoes_ambiente, opcoes_cartao, opcoes_dias,
        opcoes_hora, opcoes_pet, opcoes_estilo_servico, opcoes_glutenfree, opcoes_lactosefree
    } = req.body;

    try {
        const novasOpcoes = new OpcoesSair({
            opcoes_cidades, opcoes_bairro, opcoes_regiao, opcoes_entrada, opcoes_estacao,
            opcoes_estrelas, opcoes_avaliacao, opcoes_acessibilidade, opcoes_musica, opcoes_estacionamento,
            opcoes_cover, opcoes_kids, opcoes_musical, opcoes_cozinha, opcoes_local, opcoes_preco,
            opcoes_tipo_evento, opcoes_hobby, opcoes_ambiente, opcoes_cartao, opcoes_dias,
            opcoes_hora, opcoes_pet, opcoes_estilo_servico, opcoes_glutenfree, opcoes_lactosefree
        });

        await novasOpcoes.save();
        res.status(201).json(novasOpcoes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
