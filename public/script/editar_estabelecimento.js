var token = localStorage.getItem('token');

let todasCidades = [];
var choicesInstances = {};

const multiselectConfigurations = [
    { selector: '#multiselectTiposEvento', placeholder: 'Selecione os tipos de evento' },
    { selector: '#multiselectMetro', placeholder: 'Selecione as linhas de metrô' },
    { selector: '#multiselectEstacoes', placeholder: 'Selecione as estações de metrô' },
    { selector: '#multiselectAcessibilidade', placeholder: 'Selecione as opções de acessibilidade' },
    { selector: '#multiselectPremios', placeholder: 'Selecione as premiações recebidas' },
    { selector: '#multiselectEstilosMusicais', placeholder: 'Selecione os estilos musicais' },
    { selector: '#multiselectCozinha', placeholder: 'Selecione os tipos de cozinha' },
    { selector: '#multiselectLocais', placeholder: 'Selecione os locais disponíveis' },
    { selector: '#multiselectHobbies', placeholder: 'Selecione os hobbies oferecidos' },
    { selector: '#multiselectAmbientes', placeholder: 'Selecione os tipos de ambientes' },
    { selector: '#multiselectTiposCartao', placeholder: 'Selecione os tipos de cartão aceitos' },
    { selector: '#multiselectEstilosServico', placeholder: 'Selecione os estilos de serviço' }
];


$(document).ready(function () {
    $('#cidade').select2();
    $('#regiao').select2();
    $('#bairro').select2();
    $('#bairroInput').hide();

    var $bairroSelect2Container = $('#bairro').next('.select2-container');

    $('#cidade').on('change', function () {
        var cidadeSelecionada = $(this).val();

        if (cidadeSelecionada !== 'São Paulo') {
            $bairroSelect2Container.hide(); // Esconde o contêiner do Select2
            $('#bairroInput').show(); // Mostra o input
        } else {
            $bairroSelect2Container.show(); // Mostra o contêiner do Select2
            $('#bairroInput').hide().val(''); // Esconde o input e limpa o texto
        }
    });
});


// Centralizar a div de estabelecimentos
var estabelecimentoDiv = document.getElementById('estabelecimentoDiv');
estabelecimentoDiv.style.display = 'flex';
estabelecimentoDiv.style.flexDirection = 'column';
estabelecimentoDiv.style.alignItems = 'center';
estabelecimentoDiv.style.textAlign = 'center';

// Esconder a Div updateCadastro inicialmente
document.addEventListener('DOMContentLoaded', function () {
    criarNavbar();
    fetchLugares();
    montarMultiSelect();
    montarOpcoesHorario();
    document.getElementById('updateCadastro').style.display = 'none';
})

// função para deixar o formulario de cadastro visivel
function toggleDiv() {
    var div2 = document.getElementById('updateCadastro');
    div2.style.display = (div2.style.display === 'none' || div2.style.display === '') ? 'block' : 'none';
}

function handleMultiSelect(selectId, aux) {
    // Supondo que as instâncias do Choices.js estão armazenadas em choicesInstances
    const choicesInstance = choicesInstances[selectId];
    
    if (choicesInstance) {
        // Define os valores selecionados
        choicesInstance.setChoiceByValue(aux);
    }
}

function handleSelect(selectId, valores) {
    const selectElement = document.getElementById(selectId);

    if (!selectElement) return; // Se o elemento não existir, saia da função

    if (selectElement.multiple) {
        // Para selects múltiplos, desmarque todas as opções primeiro
        Array.from(selectElement.options).forEach(option => option.selected = false);

        // Marque as opções que correspondem aos valores
        valores.forEach(valor => {
            const option = Array.from(selectElement.options).find(opt => opt.value === valor);
            if (option) option.selected = true;
        });
    } else {
        // Para selects simples, basta definir o valor
        selectElement.value = valores;
    }
}

// Codigo que verifica se o botão editar foi assionado e preenche os campos com os dados do estabelecimento
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('editar').addEventListener('click', function(e) {
        e.preventDefault();
        toggleDiv()

        const lugarId = document.getElementById('lugarSelect').value;

        obterDadosDoLugar(lugarId)
            .then(data => {
                // Preenchendo o formulário com as informações do estabelecimento
                document.getElementById('nome').value = data.nome;
                document.getElementById('descricao').value = data.descricao;
                document.getElementById('rua').value = data.rua;
                document.getElementById('cep').value = data.cep;
                document.getElementById('cnpj').value = data.cnpj;
                document.getElementById('cidade').value = data.cidade;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('regiao').value = data.regiao;
                document.getElementById('entrada').value = data.entrada;
                handleMultiSelect('#multiselectMetro', data.linha_metro);
                handleMultiSelect('#multiselectEstacoes', data.estacao);
                document.getElementById('estrelas').value = data.estrelas;
                document.getElementById('avaliacao_clientes').value = data.avaliacao_clientes;
                document.getElementById('preco').value = data.preco;
                document.getElementById('nivel').value = data.nivel;
                document.getElementById('link_pagina').value = data.link_pagina;
                document.getElementById('website').value = data.website;
                document.getElementById('link_cardapio').value = data.link_cardapio;
                handleMultiSelect('#multiselectAcessibilidade', data.acessibilidade);
                handleMultiSelect('#multiselectPremios', data.premio);
                handleSelect('musica', data.musica);
                handleSelect('estacionamento', data.estacionamento);
                handleSelect('kids', data.kids);
                handleSelect('pet', data.pet);
                handleSelect('glutenfree', data.glutenfree);
                handleSelect('lactosefree', data.lactosefree);
                handleMultiSelect('multiselectEstilosMusicais', data.estilo_musical);
                handleMultiSelect('#multiselectCozinha', data.cozinha);
                handleMultiSelect('#multiselectLocais', data.local);
                handleMultiSelect('#multiselectTiposEvento', data.tipo_evento);
                handleMultiSelect('#multiselectHobbies', data.hobby);
                handleMultiSelect('#multiselectAmbientes', data.ambiente);
                handleMultiSelect('#multiselectTiposCartao', data.cartao);
                handleMultiSelect('#multiselectEstilosServico', data.estilo_servico);
                console.log(data.horarios_funcionamento);
                Object.keys(data.horarios_funcionamento).forEach(dia => {
                    document.getElementById(`abertura-${dia}`).value = data.horarios_funcionamento[dia].abertura;
                    document.getElementById(`fechamento-${dia}`).value = data.horarios_funcionamento[dia].fechamento;
                });
                })
            .catch(error => {
                console.error('Erro ao obter dados do estabelecimento:', error);
            });

    })
})

// Codigo que verifica se o botão atualizar foi assionado e atualiza os dados do estabelecimento no banco de dados
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('atualizar').addEventListener('click', function (event) {
        event.preventDefault();
        const lugarId = document.getElementById('lugarSelect').value;
        const horariosFuncionamento = obterHorariosFuncionamento();
        let camposValidos = validarFormulario();
        if (camposValidos) {
            const cidadeSelecionada = $('#cidade').select2('data')[0] ? $('#cidade').select2('data')[0].id : '';
            const regiaoSelecionada = $('#regiao').select2('data')[0] ? $('#regiao').select2('data')[0].id : '';
            let bairro;
    
            if (cidadeSelecionada !== 'São Paulo') {
                bairro = document.getElementById('bairroInput').value; // Pega do input
            } else {
                bairro = $('#bairro').select2('data')[0] ? $('#bairro').select2('data')[0].text : ''; // Pega do select
            }
    
            const lugar = {
                nome: document.getElementById('nome').value,
                descricao: document.getElementById('descricao').value,
                rua: document.getElementById('rua').value,
                cep: document.getElementById('cep').value,
                cnpj: document.getElementById('cnpj').value,
                cidade: cidadeSelecionada,
                regiao: regiaoSelecionada,
                bairro: bairro,
                entrada: document.getElementById('entrada').value,
                latitude: parseFloat(document.getElementById('latitude').value),
                longitude: parseFloat(document.getElementById('longitude').value),
                linha_metro: Array.from(document.getElementById('multiselectMetro').selectedOptions).map(opt => opt.value),
                estacao: Array.from(document.getElementById('multiselectEstacoes').selectedOptions).map(opt => opt.value),
                estrelas: parseFloat(document.getElementById('estrelas').value),
                avaliacao_clientes: parseFloat(document.getElementById('avaliacao_clientes').value),
                link_pagina: document.getElementById('link_pagina').value,
                acessibilidade: Array.from(document.getElementById('multiselectAcessibilidade').selectedOptions).map(opt => opt.value),
                musica: document.getElementById('musica').value,
                estacionamento: document.getElementById('estacionamento').value,
                kids: document.getElementById('kids').value,
                website: document.getElementById('website').value,
                premio: Array.from(document.getElementById('multiselectPremios').selectedOptions).map(opt => opt.value),
                estilo_musical: Array.from(document.getElementById('multiselectEstilosMusicais').selectedOptions).map(opt => opt.value),
                cozinha: Array.from(document.getElementById('multiselectCozinha').selectedOptions).map(opt => opt.value),
                local: Array.from(document.getElementById('multiselectLocais').selectedOptions).map(opt => opt.value),
                preco: parseFloat(document.getElementById('preco').value),
                tipo_evento: Array.from(document.getElementById('multiselectTiposEvento').selectedOptions).map(opt => opt.value),
                hobby: Array.from(document.getElementById('multiselectHobbies').selectedOptions).map(opt => opt.value),
                ambiente: Array.from(document.getElementById('multiselectAmbientes').selectedOptions).map(opt => opt.value),
                cartao: Array.from(document.getElementById('multiselectTiposCartao').selectedOptions).map(opt => opt.value),
                nivel: parseFloat(document.getElementById('nivel').value),
                link_cardapio: document.getElementById('link_cardapio').value,
                horarios_funcionamento: horariosFuncionamento,
                pet: document.getElementById('pet').value,
                estilo_servico: Array.from(document.getElementById('multiselectEstilosServico').selectedOptions).map(opt => opt.value),
                glutenfree: document.getElementById('glutenfree').value,
                lactosefree: document.getElementById('lactosefree').value
            };
    
            atualizarDados(lugarId,lugar);
        }
        else{
            var popup = document.getElementById('notificationPopupPreenchimento');
            popup.style.display = 'block';
    
            // Espera 3 segundos antes de redirecionar
            setTimeout(function() {
                popup.style.display = 'none';
            }, 4500);
        }
    })
})
