document.addEventListener('DOMContentLoaded', function() {
    criarNavbar();
    let sessionId = localStorage.getItem('sessionId');
    enviarDadosDeAcesso(sessionId, 'acesso à informações')
});
