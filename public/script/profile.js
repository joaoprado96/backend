document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('currentUser'); // Obtendo o username do localStorage

    if (!username) {
        console.error('Nenhum usuário logado');
        return; // Ou redirecionar para a página de login
    }

    const tipoUsuarioSelect = document.getElementById('tipoUsuario');
    const cpfField = document.getElementById('cpf');
    const cnpjField = document.getElementById('cnpj');

    // Função para controlar a visibilidade dos campos CPF e CNPJ
    function ajustarCamposTipoUsuario() {
        const tipoUsuario = tipoUsuarioSelect.value;
        cpfField.style.display = tipoUsuario === 'fisica' ? 'block' : 'none';
        cnpjField.style.display = tipoUsuario === 'juridica' ? 'block' : 'none';
    }

    tipoUsuarioSelect.addEventListener('change', ajustarCamposTipoUsuario);

    fetch(`/api/user/${username}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao buscar dados do usuário');
        }
        return response.json();
    })
    .then(data => {
        // Preenchendo os campos do formulário com os dados
        document.getElementById('nome').value = data.nome || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('endereco').value = data.endereco || '';
        document.getElementById('dataNascimento').value = data.dataNascimento ? data.dataNascimento.split('T')[0] : '';
        document.getElementById('sexo').value = data.sexo || '';
        document.getElementById('genero').value = data.genero || '';
        document.getElementById('telefone').value = data.telefone || '';
        document.getElementById('fotoPerfil').value = data.fotoPerfil || '';
        document.getElementById('biografia').value = data.biografia || '';
        document.getElementById('nacionalidade').value = data.nacionalidade || '';

        tipoUsuarioSelect.value = data.tipoUsuario || '';
        cpfField.value = data.cpf || '';
        cnpjField.value = data.cnpj || '';

        document.getElementById('facebook').value = data.redesSociais?.facebook || '';
        document.getElementById('twitter').value = data.redesSociais?.twitter || '';
        document.getElementById('instagram').value = data.redesSociais?.instagram || '';

        // Ajustar os campos de seleção para nacionalidade, sexo e gênero
        const nacionalidadeSelect = document.getElementById('nacionalidade');
        const sexoSelect = document.getElementById('sexo');
        const generoSelect = document.getElementById('genero');
        const idiomaSelect = document.getElementById('idioma');

        const nacionalidade = data.nacionalidade || '';
        const sexo = data.sexo || '';
        const genero = data.genero || '';
        const idioma = data.preferencias?.idioma || '';

        if (nacionalidade && Array.from(nacionalidadeSelect.options).some(option => option.value === nacionalidade)) {
            nacionalidadeSelect.value = nacionalidade;
        } else {
            nacionalidadeSelect.value = ''; // ou defina um valor padrão, se apropriado
        }

        if (sexo && Array.from(sexoSelect.options).some(option => option.value === sexo)) {
            sexoSelect.value = sexo;
        } else {
            sexoSelect.value = ''; // ou defina um valor padrão, se apropriado
        }

        if (genero && Array.from(generoSelect.options).some(option => option.value === genero)) {
            generoSelect.value = genero;
        } else {
            generoSelect.value = ''; // ou defina um valor padrão, se apropriado
        }
        
        if (idioma && Array.from(idiomaSelect.options).some(option => option.value === idioma)) {
            idiomaSelect.value = idioma;
        } else {
            idiomaSelect.value = ''; // ou defina um valor padrão, se apropriado
        }
        
        document.getElementById('tema').value = data.preferencias?.tema || '';

        // Ajustar a visibilidade dos campos CPF e CNPJ
        ajustarCamposTipoUsuario();
    })
    .catch(error => {
        console.error('Erro:', error);
    });

    document.getElementById('editProfileForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Coletar os dados do formulário
        const updatedData = {
            nome: document.getElementById('nome').value,
            endereco: document.getElementById('endereco').value,
            dataNascimento: document.getElementById('dataNascimento').value,
            sexo: document.getElementById('sexo').value,
            genero: document.getElementById('genero').value,
            telefone: document.getElementById('telefone').value,
            fotoPerfil: document.getElementById('fotoPerfil').value,
            biografia: document.getElementById('biografia').value,
            nacionalidade: document.getElementById('nacionalidade').value,
            tipoUsuario: document.getElementById('tipoUsuario').value,
            cpf: document.getElementById('cpf').value,
            cnpj: document.getElementById('cnpj').value,
            redesSociais: {
                facebook: document.getElementById('facebook').value,
                twitter: document.getElementById('twitter').value,
                instagram: document.getElementById('instagram').value,
            },
            preferencias: {
                idioma: document.getElementById('idioma').value,
                tema: document.getElementById('tema').value,
            },
            // Inclua outros campos conforme necessário
        };
        

        // Enviar solicitação PUT para atualizar os dados do usuário
        fetch(`/api/user/update/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Falha ao atualizar perfil');
        })
        .then(data => {
            var popup = document.getElementById('notificationPopupSucesso');
            popup.style.display = 'block';
    
            setTimeout(function() {
                popup.style.display = 'none';
            }, 4500);
        })
        .catch(error => {
            var popup = document.getElementById('notificationPopupFalha');
            popup.style.display = 'block';
    
            setTimeout(function() {
                popup.style.display = 'none';
            }, 4500);
        });
    });
});
