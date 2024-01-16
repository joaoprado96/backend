var token = localStorage.getItem('token');

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
    Inicializar();
});

function Inicializar(){
    // Pré-preenchendo campos de texto e área de texto
    document.getElementById('nome').value = 'Nome do Estabelecimento';
    document.getElementById('descricao').value = 'Descrição do Estabelecimento';
    document.getElementById('rua').value = 'Rua do Estabelecimento';
    document.getElementById('cep').value = '01000-000';
    document.getElementById('cnpj').value = '01000-000';
    document.getElementById('latitude').value = -23.5629;
    document.getElementById('longitude').value = -46.6544;
    document.getElementById('estrelas').value = 4;
    document.getElementById('avaliacao_clientes').value = 4;
    document.getElementById('avaliacao_pagina').value = 5;
    document.getElementById('preco').value = 5;
    document.getElementById('nivel').value = 2;
    document.getElementById('descricao_pagina').value = 'Descrição na página de mídia social';
    document.getElementById('link_pagina').value = 'https://www.paginadoestabelecimento.com';
    document.getElementById('midia_pagina').value = 'https://www.midiasocial.com/estabelecimento';
    document.getElementById('website').value = 'https://www.estabelecimento.com';
    document.getElementById('link_cardapio').value = 'https://www.estabelecimento.com/cardapio';
    

    // Pré-preenchendo seleções de opções únicas
    document.getElementById('musica').value = 'Sim';
    document.getElementById('estacionamento').value = 'Não';
    // document.getElementById('cover').value = 'Sim';
    document.getElementById('kids').value = 'Não';
    document.getElementById('pet').value = 'Sim';
    document.getElementById('glutenfree').value = 'Sim';
    document.getElementById('lactosefree').value = 'Não';

    // Inicializando horários de funcionamento
    document.getElementById('abertura-segunda').value = '08:00';
    document.getElementById('fechamento-segunda').value = '18:00';
    document.getElementById('abertura-terca').value = '08:00';
    document.getElementById('fechamento-terca').value = '18:00';
    document.getElementById('abertura-quarta').value = '08:00';
    document.getElementById('fechamento-quarta').value = '18:00';
    document.getElementById('abertura-quinta').value = '08:00';
    document.getElementById('fechamento-quinta').value = '18:00';
    document.getElementById('abertura-sexta').value = '08:00';
    document.getElementById('fechamento-sexta').value = '18:00';
    document.getElementById('abertura-sabado').value = '09:00';
    document.getElementById('fechamento-sabado').value = '14:00';
    document.getElementById('abertura-domingo').value = '09:00';
    document.getElementById('fechamento-domingo').value = '14:00';

    // Configurações para feriados
    document.getElementById('abertura-feriados').value = 'consultar'; // Ou outro valor padrão para feriados
    document.getElementById('fechamento-feriados').value = 'consultar'; // Ou outro valor padrão para feriados
    

    // Pré-preenchendo seleções múltiplas
    $('#multiselectMetro').val(['Linha 1 (Azul)', 'Linha 2 (Verde)']).trigger('change');
    $('#multiselectEstacoes').val(['Jabaquara', 'Conceição']).trigger('change');
    $('#multiselectAcessibilidade').val(['banheiro acessível', 'rampas de acesso']).trigger('change');
    $('#multiselectPremios').val(['Os Melhores da Gastronomia 2023']).trigger('change');
    $('#multiselectEstilosMusicais').val(['Jazz', 'Blues']).trigger('change');
    $('#multiselectCozinha').val(['Italiana', 'Japonesa']).trigger('change');
    $('#multiselectLocais').val(['restaurante', 'bar']).trigger('change');
    $('#multiselectTiposEvento').val(['happy hour', 'música ao vivo']).trigger('change');
    $('#multiselectHobbies').val(['leitura', 'ciclismo']).trigger('change');
    $('#multiselectAmbientes').val(['jardim', 'terraço']).trigger('change');
    $('#multiselectTiposCartao').val(['visa', 'mastercard']).trigger('change');
    $('#multiselectEstilosServico').val(['buffet', 'à la carte']).trigger('change');
}
document.getElementById("formCadastro").addEventListener("submit", function(event){
    event.preventDefault(); // Evita o envio padrão do formulário
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
            cover: "Sem informação",
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

function enviarDados(dados) {
    fetch('/api/lugares', {
        method: 'POST',
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
        enviarFotos(data._id).then(resultado => {
            if (resultado) {
                var popup = document.getElementById('notificationPopupSucesso');
                popup.style.display = 'block';
        
                // Espera 3 segundos antes de redirecionar
                setTimeout(function() {
                    popup.style.display = 'none';
                }, 4500);
            } else {
                var popup = document.getElementById('notificationPopupFalha');
                popup.style.display = 'block';
        
                // Espera 3 segundos antes de redirecionar
                setTimeout(function() {
                    popup.style.display = 'none';
                }, 4500);
            }
        });
        

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


function enviarFotos(lugarId) {
    const fotos = document.getElementById('fotos').files;
    const formData = new FormData();

    formData.append('lugarId', lugarId);
    for (let i = 0; i < fotos.length; i++) {
        formData.append('fotos', fotos[i]);
    }

    return new Promise((resolve, reject) => {
        fetch('/api/fotos-lugares', {
            method: 'POST',
            headers: { authorization: token },
            body: formData
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Falha ao enviar fotos');
            }
        })
        .then(data => {
            resolve(true);
        })
        .catch(error => {
            console.error('Erro ao enviar fotos:', error);
            resolve(false);
        });
    });
}


function obterHorariosFuncionamento() {
    const horarios = {
        "segunda-feira": {
            abertura: document.getElementById('abertura-segunda').value,
            fechamento: document.getElementById('fechamento-segunda').value
        },
        "terca-feira": {
            abertura: document.getElementById('abertura-terca').value,
            fechamento: document.getElementById('fechamento-terca').value
        },
        "quarta-feira": {
            abertura: document.getElementById('abertura-quarta').value,
            fechamento: document.getElementById('fechamento-quarta').value
        },
        "quinta-feira": {
            abertura: document.getElementById('abertura-quinta').value,
            fechamento: document.getElementById('fechamento-quinta').value
        },
        "sexta-feira": {
            abertura: document.getElementById('abertura-sexta').value,
            fechamento: document.getElementById('fechamento-sexta').value
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