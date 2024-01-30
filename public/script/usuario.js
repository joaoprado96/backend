document.addEventListener('DOMContentLoaded', function() {
  criarNavbar();
});

document.getElementById('tipoUsuario').addEventListener('change', function() {
  var tipo = this.value;
  document.getElementById('cpf').style.display = tipo === 'fisica' ? 'block' : 'none';
  document.getElementById('cnpj').style.display = tipo === 'juridica' ? 'block' : 'none';
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var userData = {
    username: document.getElementById('username').value,
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    tipoUsuario: document.getElementById('tipoUsuario').value, // Campo obrigatório
    cpf: document.getElementById('tipoUsuario').value === 'fisica' ? document.getElementById('cpf').value : undefined,
    cnpj: document.getElementById('tipoUsuario').value === 'juridica' ? document.getElementById('cnpj').value : undefined,
    // Outros campos
    endereco: document.getElementById('endereco').value,
    dataNascimento: document.getElementById('dataNascimento').value
  };

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if(response.ok) {
      return response.text();
    }
    throw new Error('Falha no registro');
  })
  .then(data => {
    var popup = document.getElementById('notificationPopupSucesso');
    popup.style.display = 'block';

    setTimeout(function() {
        popup.style.display = 'none';
        window.location.href = '/login.html'; // Redireciona para a página de login após o registro    
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
