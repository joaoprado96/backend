const Estabelecimento = require('../models/indicadoresModel'); // Importe o modelo do Mongoose
const moment = require('moment');

async function atualizarIndicador(LugarId, nomeIndicador, requestBody) {
  const hoje = moment().format('DD-MM-YYYY');
  const nomeEstabelecimento = requestBody.nome;

  try {
    let estabelecimento = await Estabelecimento.findOne({ LugarId });

    if (estabelecimento) {
      // Verifica se o indicador para o dia atual já existe
      let indicador = estabelecimento.indicadores[nomeIndicador].find(ind => ind.data === hoje);

      if (indicador) {
        // Incrementa o valor se o indicador já existir para o dia atual
        indicador.valor += 1;
      } else {
        // Cria um novo indicador para o dia atual
        estabelecimento.indicadores[nomeIndicador].push({ data: hoje, valor: 1 });
      }

      await estabelecimento.save();
    } else {
      // Cria um novo estabelecimento se não existir
      estabelecimento = new Estabelecimento({
        LugarId,
        nome: nomeEstabelecimento,
        indicadores: {
          [nomeIndicador]: [{ data: hoje, valor: 1 }]
        }
      });

      await estabelecimento.save();
    }
  } catch (error) {
    console.error('Erro ao atualizar indicador:', error);
    throw error;
  }
}


async function removerIndicadoresPorData(dataEspecifica) {
  try {
    const estabelecimentos = await Estabelecimento.find();

    for (let estabelecimento of estabelecimentos) {
      for (let chaveIndicador in estabelecimento.indicadores) {
        estabelecimento.indicadores[chaveIndicador] = estabelecimento.indicadores[chaveIndicador].filter(indicador => indicador.data !== dataEspecifica);
      }
      await estabelecimento.save();
    }
  } catch (error) {
    console.error('Erro ao remover indicadores:', error);
    throw error;
  }
}

module.exports = { removerIndicadoresPorData, atualizarIndicador };