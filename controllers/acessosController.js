const Acesso = require('../models/acessosModel'); // substitua '../models/Acesso' pelo caminho correto do seu modelo

exports.adicionarEvento = async (req, res) => {
  const { idSessao, sistemaOperacional, tipoDispositivo, navegador, resolucaoTela, localizacao, eventos } = req.body;

  try {
    // Procurar uma sessão existente
    let acesso = await Acesso.findOne({ idSessao });

    if (acesso) {
      // Adicionar evento à sessão existente
      eventos.forEach(evento => {
        acesso.eventos.push({ ...evento, dataHora: new Date() });
      });
      await acesso.save();
    } else {
      // Criar uma nova sessão
      const novoAcesso = new Acesso({
        idSessao,
        dataHora: new Date(), // Data e hora atuais
        sistemaOperacional,
        tipoDispositivo,
        navegador,
        resolucaoTela,
        localizacao,
        eventos: eventos.map(evento => ({ ...evento, dataHora: new Date() })) // Adicionando a data e hora atuais a cada evento
      });

      await novoAcesso.save();
    }

    res.status(200).json({ message: 'Evento(s) adicionado(s) com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar a solicitação.', error });
  }
};

exports.contarSessoesUnicasPorDia = async (req, res) => {
  try {
      const resultado = await Acesso.aggregate([
          {
              $group: {
                  _id: {
                      year: { $year: "$dataHora" },
                      month: { $month: "$dataHora" },
                      day: { $dayOfMonth: "$dataHora" }
                  },
                  sessoesUnicas: { $addToSet: "$idSessao" }
              }
          },
          {
              $project: {
                  _id: 0,
                  data: "$_id",
                  quantidade: { $size: "$sessoesUnicas" }
              }
          },
          {
              $sort: { "data.year": 1, "data.month": 1, "data.day": 1 }
          }
      ]);

      res.json(resultado);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erro ao realizar a agregação', error });
  }
};

// ... (restante do código do controlador)

exports.contarSessoesUnicasPorCidade = async (req, res) => {
  try {
      const resultado = await Acesso.aggregate([
          {
              $group: {
                  _id: "$localizacao.cidade",
                  sessoesUnicas: { $addToSet: "$idSessao" }
              }
          },
          {
              $project: {
                  _id: 0,
                  cidade: "$_id",
                  quantidade: { $size: "$sessoesUnicas" }
              }
          },
          {
              $sort: { cidade: 1 }
          }
      ]);

      res.json(resultado);
  } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erro ao realizar a agregação', error });
  }
};
