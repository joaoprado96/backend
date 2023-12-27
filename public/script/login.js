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