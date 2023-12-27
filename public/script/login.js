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
      alert(data.message); // Mostra uma mensagem de alerta com a mensagem do servidor
      localStorage.setItem('token', data.token); // Salva o token no localStorage
      window.location.href = '/home.html'; // Redireciona para a página desejada
  })
  .catch(error => {
      console.error('Erro no login:', error);
      alert('Erro no login: ' + error.message);
  });
});
