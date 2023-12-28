document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var userData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      nome: document.getElementById('nome').value,
      endereco: document.getElementById('endereco').value,
      dataNascimento: document.getElementById('dataNascimento').value,
      email: document.getElementById('email').value,
      sexo: document.getElementById('sexo').value,
      genero: document.getElementById('genero').value
    };

    fetch('/api/register', { // Altere para a URL correta se necessário
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

      // Espera 3 segundos antes de redirecionar
      setTimeout(function() {
          popup.style.display = 'none';
          window.location.href = '/login.html'; // Redireciona para a página desejada    
      }, 4500);
      // Você pode redirecionar o usuário ou limpar o formulário aqui
    })
    .catch(error => {
      var popup = document.getElementById('notificationPopupFalha');
      popup.style.display = 'block';

      // Espera 3 segundos antes de redirecionar
      setTimeout(function() {
          popup.style.display = 'none';
      }, 4500);
    });
  });