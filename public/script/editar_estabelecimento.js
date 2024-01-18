// Pegar o token
var token = localStorage.getItem('token');

// Centralizar a div de estabelecimentos
var estabelecimentoDiv = document.getElementById('estabelecimentoDiv');
estabelecimentoDiv.style.display = 'flex';
estabelecimentoDiv.style.flexDirection = 'column';
estabelecimentoDiv.style.alignItems = 'center';
estabelecimentoDiv.style.textAlign = 'center';

// Esconder a Div updateCadastro inicialmente
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('updateCadastro').style.display = 'none';
})

// função para deixar o formulario de cadastro visivel
function toggleDiv() {
    var div2 = document.getElementById('updateCadastro');
    div2.style.display = (div2.style.display === 'none' || div2.style.display === '') ? 'block' : 'none';
}

// Verificar se esta com token
document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
    // Se não houver token, mostra a notificação popup e redireciona
    if (!token) {
        var popup = document.getElementById('notificationPopupLogin');
        popup.style.display = 'block';

        // Espera 3 segundos antes de redirecionar
        setTimeout(function() {
            window.location.href = '/login.html';
        }, 4500);
    }
    fetchLugares();
});

// Criar a lista de estabelecimentos
function fetchLugares() {
    fetch('/api/lugares')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('lugarSelect');
            data.forEach(lugar => {
                const option = document.createElement('option');
                option.value = lugar._id;
                option.textContent = `${lugar.nome} (id: ${lugar._id})`;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar lugares:', error));
}

// Acessar estabelecimentos no banco de dados
function obterDadosDoLugar(lugarId) {
    return fetch(`/api/lugares/${lugarId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token // Certifique-se de que o token está definido corretamente
        },
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for OK (ex., status 400 ou 500), lança um erro
            throw new Error(`Erro na requisição: Status ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Erro ao obter dados do estabelecimento:', error);
        throw error; // Propagate the error to the caller
    });
}

function handleMultiSelect(selectId, aux) {
    $(`#${selectId}`).val(aux).trigger('change');

}

// Função para validar os campos antes de atualizar o cadastro
function validarCampos() {
    let valido = true;
    const campos = document.querySelectorAll("#formCadastro input, #formCadastro select, #formCadastro textarea");

    campos.forEach(campo => {
        if (!campo.value) {
            campo.style.border = "2px solid red"; // Altera a borda para vermelho se o campo estiver vazio
            valido = false;
        } else {
            campo.style.border = ""; // Remove o estilo de borda se o campo estiver preenchido
        }
    });

    return valido;
}

// Função para organizar os valores de horarios
function obterHorariosFuncionamento() {
    const horarios = {
        "segunda-feira": {
            abertura: document.getElementById('abertura-segunda-feira').value,
            fechamento: document.getElementById('fechamento-segunda-feira').value
        },
        "terca-feira": {
            abertura: document.getElementById('abertura-terca-feira').value,
            fechamento: document.getElementById('fechamento-terca-feira').value
        },
        "quarta-feira": {
            abertura: document.getElementById('abertura-quarta-feira').value,
            fechamento: document.getElementById('fechamento-quarta-feira').value
        },
        "quinta-feira": {
            abertura: document.getElementById('abertura-quinta-feira').value,
            fechamento: document.getElementById('fechamento-quinta-feira').value
        },
        "sexta-feira": {
            abertura: document.getElementById('abertura-sexta-feira').value,
            fechamento: document.getElementById('fechamento-sexta-feira').value
        },
        "sabado": {
            abertura: document.getElementById('abertura-sabado').value,
            fechamento: document.getElementById('fechamento-sabado').value
        },
        "domingo": {
            abertura: document.getElementById('abertura-domingo').value,
            fechamento: document.getElementById('fechamento-domingo').value
        },
        "feriados": {
            abertura: document.getElementById('abertura-feriados').value,
            fechamento: document.getElementById('fechamento-feriados').value
        }
    };

    return horarios;
}

// Função para atualizar os dados do estabelecimento
function enviarDados(lugarId,dados) {
    fetch(`/api/lugares/${lugarId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token // Certifique-se de que o token está definido corretamente
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for OK (ex., status 400 ou 500), lança um erro
            throw new Error(`Erro na requisição: Status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the successful update
        console.log('Dados atualizados com sucesso:', data);
        var popup = document.getElementById('notificationPopupSucesso');
        popup.style.display = 'block';
    })
    .catch((error) => {
        var popup = document.getElementById('notificationPopupFalha');
        popup.style.display = 'block';

        // Espera 3 segundos antes de redirecionar
        setTimeout(function() {
            popup.style.display = 'none';
        }, 4500);
        console.error('Erro:', error);
    });
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
                handleMultiSelect('multiselectMetro', data.linha_metro);
                handleMultiSelect('multiselectEstacoes', data.estacao);
                document.getElementById('estrelas').value = data.estrelas;
                document.getElementById('avaliacao_clientes').value = data.avaliacao_clientes;
                document.getElementById('avaliacao_pagina').value = data.avaliacao_pagina;
                document.getElementById('preco').value = data.preco;
                document.getElementById('nivel').value = data.nivel;
                document.getElementById('descricao_pagina').value = data.descricao_pagina;
                document.getElementById('link_pagina').value = data.link_pagina;
                document.getElementById('midia_pagina').value = data.midia_pagina;
                document.getElementById('website').value = data.website;
                document.getElementById('link_cardapio').value = data.link_cardapio;
                handleMultiSelect('multiselectAcessibilidade', data.acessibilidade);
                handleMultiSelect('multiselectPremios', data.premio);
                handleMultiSelect('musica', data.musica);
                handleMultiSelect('estacionamento', data.estacionamento);
                handleMultiSelect('cover', data.cover);
                handleMultiSelect('kids', data.kids);
                handleMultiSelect('pet', data.pet);
                handleMultiSelect('glutenfree', data.glutenfree);
                handleMultiSelect('lactosefree', data.lactosefree);
                handleMultiSelect('multiselectEstilosMusicais', data.estilo_musical);
                handleMultiSelect('multiselectCozinha', data.cozinha);
                handleMultiSelect('multiselectLocais', data.local);
                handleMultiSelect('multiselectTiposEvento', data.tipo_evento);
                handleMultiSelect('multiselectHobbies', data.hobby);
                handleMultiSelect('multiselectAmbientes', data.ambiente);
                handleMultiSelect('multiselectTiposCartao', data.cartao);
                handleMultiSelect('multiselectEstilosServico', data.estilo_servico);
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
        let camposValidos = validarCampos();
        if (camposValidos) {
            const lugar = {
                nome: document.getElementById('nome').value,
                descricao: document.getElementById('descricao').value,
                rua: document.getElementById('rua').value,
                cep: document.getElementById('cep').value,
                cnpj: document.getElementById('cnpj').value,
                cidade: document.getElementById('cidade').value,
                bairro: document.getElementById('bairro').value,
                regiao: document.getElementById('regiao').value,
                entrada: document.getElementById('entrada').value,
                latitude: parseFloat(document.getElementById('latitude').value),
                longitude: parseFloat(document.getElementById('longitude').value),
                linha_metro: Array.from(document.getElementById('multiselectMetro').selectedOptions).map(opt => opt.value),
                estacao: Array.from(document.getElementById('multiselectEstacoes').selectedOptions).map(opt => opt.value),
                estrelas: parseFloat(document.getElementById('estrelas').value),
                avaliacao_clientes: parseFloat(document.getElementById('avaliacao_clientes').value),
                avaliacao_pagina: parseFloat(document.getElementById('avaliacao_pagina').value),
                descricao_pagina: document.getElementById('descricao_pagina').value,
                link_pagina: document.getElementById('link_pagina').value,
                midia_pagina: document.getElementById('midia_pagina').value,
                acessibilidade: Array.from(document.getElementById('multiselectAcessibilidade').selectedOptions).map(opt => opt.value),
                musica: document.getElementById('musica').value,
                estacionamento: document.getElementById('estacionamento').value,
                cover: document.getElementById('cover').value,
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
                dias: [], // Isto depende de como você deseja coletar os dias
                nivel: parseFloat(document.getElementById('nivel').value),
                link_cardapio: document.getElementById('link_cardapio').value,
                horarios_funcionamento: horariosFuncionamento,
                pet: document.getElementById('pet').value,
                estilo_servico: Array.from(document.getElementById('multiselectEstilosServico').selectedOptions).map(opt => opt.value),
                glutenfree: document.getElementById('glutenfree').value,
                lactosefree: document.getElementById('lactosefree').value
            };
    
            enviarDados(lugarId,lugar);
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
