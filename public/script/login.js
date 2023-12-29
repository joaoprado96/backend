document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var userData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
  };

  fetch('/api/login', { // Altere para a URL correta se necessário
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
  })
  .then(response => {
      if(response.ok) {
          return response.json(); // Corretamente convertido para JSON aqui
      }
      return response.json().then(text => { throw new Error(text.message || 'Falha no Login') });
  })
  .then(data => {
        var popup = document.getElementById('notificationPopupSucesso');
        popup.style.display = 'block';

        // Espera 3 segundos antes de redirecionar
        setTimeout(function() {
            popup.style.display = 'none';
            localStorage.setItem('token', data.token); // Salva o token no localStorage
            localStorage.setItem('currentUser', data.currentUser); // Salva o token no localStorage
            window.location.href = '/home.html'; // Redireciona para a página desejada    
        }, 4500);
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
