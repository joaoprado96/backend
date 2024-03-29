function validarCamposChoices() {
    let valido = true;

    // Seleciona todos os elementos select que usam Choices.js
    const selectsChoices = document.querySelectorAll("#formCadastro select[multiple]");

    selectsChoices.forEach(select => {
        // Encontra o container do Choices.js para o select atual
        const choicesContainer = select.closest('.choices');

        // Verifica se há itens selecionados
        if (select.selectedOptions.length === 0) {
            choicesContainer.style.border = "2px solid red";
            valido = false;
        } else {
            choicesContainer.style.border = "";
        }
    });

    return valido;
}

function validarOutrosCampos() {
    let valido = true;

    // Seleciona todos os inputs e textareas, exceto os que fazem parte do Choices.js
    const outrosCampos = document.querySelectorAll("#formCadastro input:not(.choices__input):not(#bairroInput), #formCadastro textarea");

    outrosCampos.forEach(campo => {
        if (!campo.value ) {
            campo.style.border = "2px solid red";
            valido = false;
        } else {
            campo.style.border = "";
        }
    });

    return valido;
}

function validarFormulario() {
    // Valida os campos Choices e os outros campos
    const validoChoices = validarCamposChoices();
    const validoOutros = validarOutrosCampos();

    // Retorna verdadeiro se ambos os conjuntos de campos forem válidos
    return validoChoices && validoOutros;
}

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

function montarOpcoesHorario() {
    var dias = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo", "feriados"];
    var horarios = gerarHorarios(); // Supondo que esta função retorna os horários

    dias.forEach(function(dia) {
        var selectAbertura = document.getElementById(`abertura-${dia}`);
        var selectFechamento = document.getElementById(`fechamento-${dia}`);
        var selectPausa = document.getElementById(`pausa-${dia}`);
        var selectInicioPausa = document.getElementById(`inicio-${dia}`);
        var selectFimPausa = document.getElementById(`fim-${dia}`);

        // Preenche os selects de abertura e fechamento
        horarios.forEach(function(horario) {
            var optionAbertura = document.createElement('option');
            var optionFechamento = document.createElement('option');

            optionAbertura.value = optionFechamento.value = horario;
            optionAbertura.textContent = optionFechamento.textContent = horario === 'fechado' ? 'Não abre' : horario;

            selectAbertura.appendChild(optionAbertura);
            selectFechamento.appendChild(optionFechamento);
        });

        // Preenche os selects de pausa, inicio e fim da pausa
        ['Pausa','Sim', 'Não'].forEach(function(opcao) {
            var optionPausa = document.createElement('option');
            optionPausa.value = optionPausa.textContent = opcao;
            selectPausa.appendChild(optionPausa);
        });

        horarios.forEach(function(horario) {
            var optionInicio = document.createElement('option');
            var optionFim = document.createElement('option');

            optionInicio.value = optionFim.value = horario;
            optionInicio.textContent = optionFim.textContent = horario;

            selectInicioPausa.appendChild(optionInicio);
            selectFimPausa.appendChild(optionFim);
        });

        // Adicionar opções específicas para feriados, se necessário
        if (dia === 'feriados') {
            var opcoesEspeciais = ['consultar', 'comercial', 'não'];
            opcoesEspeciais.forEach(function(opcao) {
                var optionAbertura = document.createElement('option');
                var optionFechamento = document.createElement('option');

                optionAbertura.value = optionFechamento.value = opcao;
                optionAbertura.textContent = optionFechamento.textContent = opcao.charAt(0).toUpperCase() + opcao.slice(1);

                selectAbertura.appendChild(optionAbertura);
                selectFechamento.appendChild(optionFechamento);
            });
        }
    });
}


function montarHorariosGlobal() {
    var horarios = gerarHorarios();

    var selectAberturaGlobal = document.getElementById('horario-abertura-global');
    var selectFechamentoGlobal = document.getElementById('horario-fechamento-global');

    horarios.forEach(function(horario) {
        var optionAbertura = document.createElement('option');
        var optionFechamento = document.createElement('option');

        optionAbertura.value = optionFechamento.value = horario;
        optionAbertura.textContent = optionFechamento.textContent = horario;

        selectAberturaGlobal.appendChild(optionAbertura);
        selectFechamentoGlobal.appendChild(optionFechamento);
    });
}

function gerarHorarios() {
    var horarios = ['fechado'];
    for (var hora = 0; hora < 24; hora++) {
        for (var minuto = 0; minuto < 60; minuto += 15) {
            var horarioFormatado = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            horarios.push(horarioFormatado);
        }
    }
    return horarios;
}


function verificarQuantidadeDeFotos(input) {
    const TAMANHO_MAXIMO = 8 * 1024 * 1024; // 8 MB em bytes

    if (input.files && input.files.length > 5) {
        alert('Você só pode selecionar no máximo 5 fotos.');
        input.value = ''; // Limpa a seleção
        return; // Encerra a função
    }

    for (let i = 0; i < input.files.length; i++) {
        if (input.files[i].size > TAMANHO_MAXIMO) {
            alert('Cada foto deve ter no máximo 8 MB.');
            input.value = ''; // Limpa a seleção
            break; // Sai do loop
        }
    }
}

function carregarCidades() {
    if (todasCidades.length > 0) {
        // As cidades já foram carregadas, você pode populá-las diretamente no select
        var select = document.getElementById('cidade');
        todasCidades.forEach(function(cidade) {
            var option = document.createElement('option');
            option.value = cidade.id; // Use o valor adequado para a cidade
            option.text = cidade.nome; // Use o nome adequado para a cidade
            select.appendChild(option);
        });
    } else {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
            .then(response => response.json())
            .then(municipios => {
                todasCidades = municipios; // Armazena todas as cidades em memória
                var select = document.getElementById('cidade');
                municipios.forEach(function(cidade) {
                    var option = document.createElement('option');
                    option.value = cidade.nome; // Use o valor adequado para a cidade
                    option.text = cidade.nome; // Use o nome adequado para a cidade
                    select.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar cidades:', error));
    }
}

function montarMultiSelect(){
    // Criação das instâncias de Choices.js para cada multiselect
    multiselectConfigurations.forEach(config => {
        choicesInstances[config.selector] = new Choices(config.selector, {
            removeItemButton: true,
            allowHTML: false,
            maxItemCount: 35,
            searchResultLimit: 10,
            renderChoiceLimit: 35,
            placeholder: true,
            placeholderValue: config.placeholder
        });
    });
}