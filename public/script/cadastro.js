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

document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
    montarOpcoesHorario();
    montarHorariosGlobal();
    carregarCidades();
    montarMultiSelect();
});

document.getElementById('aplicar-horarios').addEventListener('click', function() {
    var horarioAbertura = document.getElementById('horario-abertura-global').value;
    var horarioFechamento = document.getElementById('horario-fechamento-global').value;
    var diasSelecionados = document.querySelectorAll('input[name="dias-semana"]:checked');

    diasSelecionados.forEach(function(dia) {
        var diaId = dia.value;
        document.getElementById('abertura-' + diaId).value = horarioAbertura;
        document.getElementById('fechamento-' + diaId).value = horarioFechamento;
    });
});

document.getElementById("cadastrar").addEventListener("click", function(event){
    event.preventDefault(); // Evita o envio padrão do formulário
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

        enviarDados(lugar);
    }
    else{
        var popup = document.getElementById('notificationPopupPreenchimento');
        popup.style.display = 'block';

        // Espera 3 segundos antes de redirecionar
        setTimeout(function() {
            popup.style.display = 'none';
        }, 4500);
    }
});
