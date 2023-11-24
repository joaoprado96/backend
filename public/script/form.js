const todosOsCampos = new Set([
    'id', 'descricao', 'rua', 'cep', 'cidade', 'bairro', 'regiao', 'entrada', 'estacao', 'estrelas', 
    'avaliacao_clientes', 'avaliacao_pagina', 'descricao_pagina', 'link_pagina', 'midia_pagina', 
    'acessibilidade', 'musica', 'estacionamento', 'cover', 'kids', 'website', 'premio', 'estilo_musical', 
    'cozinha', 'local', 'preco', 'tipo_evento', 'hobby', 'ambiente', 'cartao', 'dias', 'hora', 'pet', 
    'estilo_servico', 'glutenfree', 'lactosefree'
]);

document.addEventListener('DOMContentLoaded', function() { 
    fetch('/api/opcoes-sair')
        .then(response => response.json())
        .then(data => {
            const form = document.getElementById('lugarForm');
            todosOsCampos.forEach(campo => {
                const opcoes = data[0]['opcoes_' + campo];
                if (opcoes && opcoes.length > 0) {
                    const { label, select } = createSelectField(campo, opcoes);
                    form.appendChild(label);
                    form.appendChild(select);
                } else {
                    const { label, input } = createTextField(campo);
                    form.appendChild(label);
                    form.appendChild(input);
                }
            });

            // Botão de enviar
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.className = 'btn btn-primary';
            submitButton.textContent = 'Enviar';
            form.appendChild(submitButton);

            // Inicializar os campos Select2
            $('.form-select').select2();
        });
});

function createSelectField(fieldName, options) {
    const label = document.createElement('label');
    label.textContent = formatLabel(fieldName);
    label.htmlFor = fieldName;
    label.className = 'form-label';

    const select = document.createElement('select');
    select.name = fieldName;
    select.id = fieldName;
    select.className = 'form-select';

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });

    return { label, select };
}

function createTextField(fieldName) {
    const label = document.createElement('label');
    label.textContent = formatLabel(fieldName);
    label.htmlFor = fieldName;

    const input = document.createElement('input');
    input.type = 'text';
    input.name = fieldName;
    input.id = fieldName;

    return { label, input };
}

function formatLabel(fieldName) {
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/_/g, ' ') + ':';
}
