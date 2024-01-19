document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
event.preventDefault();

var nome = document.getElementById('nome').value;
var email = document.getElementById('email').value;
var sugestao = document.getElementById('sugestao').value;

var data = {
    nome: nome,
    email: email,
    sugestao: sugestao
};

// Exemplo de função para enviar dados para o servidor
fetch('/api/incluir-sugestao', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    let sessionId = localStorage.getItem('sessionId');
    enviarDadosDeAcesso(sessionId, 'acesso à contato')
})
.catch((error) => {
    console.error('Error:', error);
});
});