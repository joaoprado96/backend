const Lugar = require('../models/lugarModel');

exports.adicionarLugar = async (req, res) => {
    const {
        nome, descricao, rua, cep, cnpj, cidade, bairro, regiao, entrada, latitude, longitude, linha_metro, estacao, estrelas,
        avaliacao_clientes,   link_pagina, 
        acessibilidade, musica, estacionamento,  kids, website, premio, estilo_musical,
        cozinha, local, preco, tipo_evento, hobby, ambiente, cartao,  nivel, link_cardapio, horarios_funcionamento, pet, estilo_servico,
        glutenfree, lactosefree
    } = req.body;

    try {
        // Verifica se o id já existe na base de dados
        const lugarExistente = await Lugar.findOne({ nome, cep, cnpj });
        if (lugarExistente) {
            return res.status(400).json({ message: 'Erro: um lugar com esse nome, CEP e CNPJ já existe.' });
        }

        // Cria um novo lugar se o id não existir
        const novoLugar = new Lugar({
            nome, descricao, rua, cep, cnpj, cidade, bairro, regiao, entrada, latitude, longitude, linha_metro, estacao, estrelas,
            avaliacao_clientes,   link_pagina, 
            acessibilidade, musica, estacionamento,  kids, website, premio, estilo_musical,
            cozinha, local, preco, tipo_evento, hobby, ambiente, cartao,  nivel, link_cardapio, horarios_funcionamento, pet, estilo_servico,
            glutenfree, lactosefree
        });

        await novoLugar.save();
        res.status(201).json(novoLugar);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};


// Nova função para buscar lugares
exports.buscarLugares = async (req, res) => {
    try {
        // Obtém os campos válidos do esquema do modelo
        const camposValidos = Object.keys(Lugar.schema.paths);

        const query = {};
        for (const key in req.query) {
            // Verifica se o campo é válido
            if (!camposValidos.includes(key)) {
                return res.status(400).json({ message: `Parâmetro inválido: ${key}` });
            }

            // Constrói a query com base nos campos válidos
            if (req.query[key] instanceof Array) {
                query[key] = { $in: req.query[key] };
            } else {
                query[key] = req.query[key];
            }
        }

        const lugares = await Lugar.find(query);
        res.status(200).json(lugares);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.buscarLugarPorId = async (req, res) => {
    try {
        const lugar = await Lugar.findById(req.params.lugarId);

        if (!lugar) {
            return res.status(404).json({ message: 'Lugar não encontrado' });
        }

        res.status(200).json(lugar);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.ataulizarLugarPorId = async (req, res) => {
    const lugarId = req.params.lugarId;

    try {
        // Fetch the existing lugar from the database
        const lugar = await Lugar.findById(lugarId);

        if (!lugar) {
            return res.status(404).json({ error: 'Lugar não encontrado.' });
        }

        // Update the lugar with the new data
        lugar.nome = req.body.nome || lugar.nome;
        lugar.descricao = req.body.descricao || lugar.descricao;
        lugar.rua = req.body.rua || lugar.rua;
        lugar.cep = req.body.cep || lugar.cep;
        lugar.cnpj = req.body.cnpj || lugar.cnpj;
        lugar.cidade = req.body.cidade || lugar.cidade;
        lugar.bairro = req.body.bairro || lugar.bairro;
        lugar.regiao = req.body.regiao || lugar.regiao;
        lugar.entrada = req.body.entrada || lugar.entrada;
        lugar.latitude = req.body.latitude || lugar.latitude;
        lugar.longitude = req.body.longitude || lugar.longitude;
        lugar.linha_metro = req.body.linha_metro || lugar.linha_metro;
        lugar.estacao = req.body.estacao || lugar.estacao;
        lugar.estrelas = req.body.estrelas || lugar.estrelas;
        lugar.avaliacao_clientes = req.body.avaliacao_clientes || lugar.avaliacao_clientes;
        lugar.link_pagina = req.body.link_pagina || lugar.link_pagina;
        lugar.acessibilidade = req.body.acessibilidade || lugar.acessibilidade;
        lugar.musica = req.body.musica || lugar.musica;
        lugar.estacionamento = req.body.estacionamento || lugar.estacionamento;
        lugar.kids = req.body.kids || lugar.kids;
        lugar.website = req.body.website || lugar.website;
        lugar.premio = req.body.premio || lugar.premio;
        lugar.estilo_musical = req.body.estilo_musical || lugar.estilo_musical;
        lugar.cozinha = req.body.cozinha || lugar.cozinha;
        lugar.local = req.body.local || lugar.local;
        lugar.preco = req.body.preco || lugar.preco;
        lugar.tipo_evento = req.body.tipo_evento || lugar.tipo_evento;
        lugar.hobby = req.body.hobby || lugar.hobby;
        lugar.ambiente = req.body.ambiente || lugar.ambiente;
        lugar.cartao = req.body.cartao || lugar.cartao;
        lugar.nivel = req.body.nivel || lugar.nivel;
        lugar.link_cardapio = req.body.link_cardapio || lugar.link_cardapio;
        lugar.horarios_funcionamento = req.body.horarios_funcionamento || lugar.horarios_funcionamento;
        lugar.pet = req.body.pet || lugar.pet;
        lugar.estilo_servico = req.body.estilo_servico || lugar.estilo_servico;
        lugar.glutenfree = req.body.glutenfree || lugar.glutenfree;
        lugar.lactosefree = req.body.lactosefree || lugar.lactosefree;

        // Save the updated lugar to the database
        const updatedLugar = await lugar.save();

        // Return the updated lugar as the response
        res.json(updatedLugar);
    } catch (error) {
        console.error('Erro ao atualizar lugar:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar lugar.' });
    }
};
