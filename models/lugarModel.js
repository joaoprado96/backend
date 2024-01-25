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
    link_pagina: String,
    acessibilidade: [String],
    musica: String,
    estacionamento: String,
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
    nivel: Number,
    link_cardapio: String,
    horarios_funcionamento: {},
    pet: String,
    estilo_servico: [String],
    glutenfree: String,
    lactosefree: String
});

module.exports = mongoose.model('Lugar', lugarSchema);

// Nosso Schema no Banco de Dados:
// const lugarSchema = new mongoose.Schema({
//     nome: Nome do Estabelecimento,
//     descricao: Descrição sobre o estabelecimento que é encontrada no site do mesmo
//     rua: Rua do Estab,
//     cep: Cep do Estab,
//     cnpj: CNPJ do estab,
//     cidade: Cidade do estab,
//     bairro: Bairro do estab,
//     regiao: Região do estab,
//     entrada: Informação se é necessário pagar para entrar no estabelecimento,
//     latitude: Latitude da localização do estabelecimento,
//     longitude: Longitude da localização do estabelecimento,
//     linha_metro: Informação sobre a linha do metrô mais próxima do endereco do estabelecimento,
//     estacao: Informação sobre a estação mais proxima do endereço do estabelecimento,
//     estrelas: Número de estrelas,segundo as avaliações do Google
//     avaliacao_clientes: Campo que será utilizado como uma média das avaliações baseadas no feedback dos clientes quando tiverem login e possibilidade de avaliar
// *    avaliacao_pagina: Este campo pode ser excluído ,
// *    descricao_pagina: Este campo pode ser excluído,
//     link_pagina: URL da página de Instagram do estabelecimento,
// *    midia_pagina: Este campo pode ser excluído,
//     acessibilidade: Campo com informações sobre a acessbilidade para PCDs,
//     musica: Se tem música ao vivo,
//     estacionamento: Se tem estacionamento,
// *    cover: Este campo pode ser excluído,
//     kids: Se tem espaço infantil,
//     website: URL do site do estabelecimento,
//     premio: Se o local já ganhou alguma premiação gastronômica,
//     estilo_musical: Estilo músical tocado no estabelecimento,
//     cozinha: Tipo de culinária,
//     local: Qual categoria de local se enquadra o estabelecimento,
//     preco: Média de valor gasto por pessoa,mensurado em cifrões,
//     tipo_evento: Tipo(s) de evento(s)  baseados no que as pessoas se propõem a ir
//     hobby: Tipos de hobbies pessoais que as pessoas poderiam encontrar nos estabelecimentos ,
//     ambiente: Tipo de ambiente do estabelecimento,
//     cartao: Formas de pagamentos e bandeiras de cartão aceitas,
//  *   dias: Dias de funcionamento,
//     nivel: Nível de cadastro do estabelecimento,
//     link_cardapio: URL com informações do cardápio do estabeleciemento,
//     horarios_funcionamento: Horários de funcionamento do estabelecimento,
//     pet: Informação sobre se o local aceita animais,
//     estilo_servico: Estilo(s) de serviço(s) realizado(s) nos estabelecimentos
//     glutenfree: Informação sobre se o estabelecimento possui opções sem glutén,
//     lactosefree: Informação sobre se o estabelecimento possui opções sem lactose
// });