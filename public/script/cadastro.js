document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
});

function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            navbarPlaceholder.innerHTML = html;
        }).catch(error => {
            console.error('Falha ao carregar o navbar:', error);
        });
}
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            footerPlaceholder.innerHTML = html;
        }).catch(error => {
            console.error('Falha ao carregar o footer:', error);
        });
}

const todosOsCampos = new Set([
    'nome', 'descricao', 'rua', 'cep', 'cidade', 'bairro', 'regiao', 'entrada', 'estacao', 'estrelas', 
    'avaliacao_clientes', 'avaliacao_pagina', 'descricao_pagina', 'link_pagina', 'midia_pagina', 
    'acessibilidade', 'musica', 'estacionamento', 'cover', 'kids', 'website', 'premio', 'estilo_musical', 
    'cozinha', 'local', 'preco', 'tipo_evento', 'hobby', 'ambiente', 'cartao', 'dias', 'hora', 'pet', 
    'estilo_servico', 'glutenfree', 'lactosefree'
]);

const camposNoMultiselect = ['estrelas','avaliacao_clientes','avaliacao_pagina','preco','musica','cover',
                            'kids','pet','lactosefree', 'glutenfree','estacionamento','cidade','regiao',
                            'bairro','entrada','estacao'];

function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            navbarPlaceholder.innerHTML = html;
        }).catch(error => {
            console.error('Falha ao carregar o navbar:', error);
        });
}
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            footerPlaceholder.innerHTML = html;
        }).catch(error => {
            console.error('Falha ao carregar o footer:', error);
        });
}

function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            navbarPlaceholder.innerHTML = html;
        }).catch(error => {
            console.error('Falha ao carregar o navbar:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/opcoes-sair')
        .then(response => response.json())
        .then(data => {
            const form = document.getElementById('lugarForm');

            // Criando divs para campos select e input
            const selectDiv = document.createElement('div');
            selectDiv.className = 'col-md-6';
            const inputDiv = document.createElement('div');
            inputDiv.className = 'col-md-6';
            
            form.appendChild(inputDiv);
            form.appendChild(selectDiv);

            todosOsCampos.forEach(campo => {
                const opcoes = data[0]['opcoes_' + campo];
                if (opcoes && opcoes.length > 0) {
                    const formGroup = createSelectField(campo, opcoes);
                    selectDiv.appendChild(formGroup);
                    // Inicializar o campo Select2
                    $(`#${campo}`).select2();
                } else {
                    const formGroup = createTextField(campo);
                    inputDiv.appendChild(formGroup);
                }
            });

            // Botão de enviar
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.className = 'btn btn-primary';
            submitButton.textContent = 'enviar';
            form.appendChild(submitButton);
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                enviarDadosFormulario();
            });
        });
});

function enviarDadosFormulario() {
    const formData = {};
    let todosPreenchidos = true;

    todosOsCampos.forEach(campo => {
        const inputElement = document.getElementById(campo);
        if (inputElement) {
            if (inputElement.multiple) {
                // Se o campo for múltiplo, colete como array
                formData[campo] = Array.from(inputElement.selectedOptions).map(option => option.value);
            } else {
                // Se não for múltiplo, colete como string
                formData[campo] = inputElement.value;
            }
        } else {
            todosPreenchidos = false;
        }
    });

    // Verificar se todos os campos foram preenchidos
    if (!todosPreenchidos) {
        mostrarNotificacao('Por favor, preencha todos os campos antes de enviar.', 'erro');
        return;
    }

    fetch('/api/lugares', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao enviar os dados');
        }
        return response.json();
    })
    .then(data => {
        mostrarNotificacao('Dados incluídos com sucesso!', 'sucesso');
        console.log('Sucesso:', data);
    })
    .catch((error) => {
        mostrarNotificacao('Erro ao enviar os dados: ' + error.message, 'erro');
        console.error('Erro:', error);
    });
}

function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;

    document.body.appendChild(notificacao);
    notificacao.style.display = 'block';

    setTimeout(() => {
        notificacao.style.display = 'none';
        document.body.removeChild(notificacao);
    }, 3000); // A notificação desaparecerá após 3 segundos
}

function createSelectField(fieldName, options) {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = formatLabel(fieldName);
    label.htmlFor = fieldName;
    label.className = 'form-label';

    const select = document.createElement('select');
    select.name = fieldName;
    select.id = fieldName;
    select.className = 'form-control'; // Bootstrap class for form elements

    if (!camposNoMultiselect.includes(fieldName)) {
        select.multiple = true;
    }

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });

    formGroup.appendChild(label);
    formGroup.appendChild(select);

    return formGroup; // Return the whole form group
}

function createTextField(fieldName) {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = formatLabel(fieldName);
    label.htmlFor = fieldName;

    const input = document.createElement('input');
    input.type = 'text';
    input.name = fieldName;
    input.id = fieldName;
    input.className = 'form-control'; // Bootstrap class for form elements

    formGroup.appendChild(label);
    formGroup.appendChild(input);

    return formGroup; // Return the whole form group
}

function formatLabel(fieldName) {
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/_/g, ' ') + ':';
}
