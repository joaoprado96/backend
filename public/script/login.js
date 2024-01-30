// Função para criar a barra de navegação
document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
});

// Evento de envio do formulário de registro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var userData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        return response.json().then(text => { throw new Error(text.message || 'Falha no Login') });
    })
    .then(data => {
        mostrarPopup('notificationPopupSucesso', 4500);
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', data.currentUser);
        setTimeout(() => window.location.href = '/home.html', 4500);
    })
    .catch(error => {
        mostrarPopup('notificationPopupFalha', 4500);
    });
});

// Função para exibir o popup
function mostrarPopup(id, duracao) {
    var popup = document.getElementById(id);
    popup.style.display = 'block';
    setTimeout(() => { popup.style.display = 'none'; }, duracao);
}

// Configuração do modal de redefinição de senha
const resetPasswordLink = document.getElementById('resetPasswordLink');
const resetPasswordModal = document.getElementById('resetPasswordModal');
const closeModal = document.getElementById('closeModal');
const resetUsername = document.getElementById('resetUsername');
const resetEmail = document.getElementById('resetEmail');
const resetPasswordButton = document.getElementById('resetPasswordButton');

resetPasswordLink.addEventListener('click', e => {
    e.preventDefault();
    resetPasswordModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    resetPasswordModal.style.display = 'none';
});

resetPasswordButton.addEventListener('click', () => {
    resetPassword(resetUsername.value, resetEmail.value);
    resetPasswordModal.style.display = 'none';
});

async function resetPassword(username, email) {
    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, email }),
        });

        if (response.ok) {
            mostrarPopup('notificationPopupSucessoRedefine', 4500);
        } else {
            const errorData = await response.json();
            console.error(errorData.error);
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
    }
}
