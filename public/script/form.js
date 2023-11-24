function createSelectField(fieldName, options) {
    const label = document.createElement('label');
    label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/_/g, ' ') + ':';
    label.htmlFor = fieldName;

    const select = document.createElement('select');
    select.name = fieldName;
    select.id = fieldName;

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });

    return { label, select };
}

function createNumberField(fieldName) {
    const label = document.createElement('label');
    label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/_/g, ' ') + ':';
    label.htmlFor = fieldName;

    const input = document.createElement('input');
    input.type = 'number';
    input.name = fieldName;
    input.id = fieldName;

    return { label, input };
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/opcoes-sair')
        .then(response => response.json())
        .then(data => {
            const form = document.getElementById('lugarForm');

            data.forEach(opcao => {
                for (const key in opcao) {
                    if (Array.isArray(opcao[key]) && opcao[key].length > 0) {
                        const { label, select } = createSelectField(key, opcao[key]);
                        form.appendChild(label);
                        form.appendChild(select);
                    } else if (typeof opcao[key] === 'number') {
                        const { label, input } = createNumberField(key);
                        form.appendChild(label);
                        form.appendChild(input);
                    }
                }
            });

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Enviar';
            form.appendChild(submitButton);
        });

    document.getElementById('lugarForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/lugares', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Lugar adicionado com sucesso!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao adicionar lugar.');
        });
    });
});
