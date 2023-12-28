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
      alert('Registro bem-sucedido: ' + data);
      // Você pode redirecionar o usuário ou limpar o formulário aqui
    })
    .catch(error => {
      console.error('Erro no registro:', error);
      alert('Erro no registro: ' + error.message);
    });
  });