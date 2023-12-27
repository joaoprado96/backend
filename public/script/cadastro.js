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
document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();

    var dadosLugar = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        rua: document.getElementById('rua').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        bairro: document.getElementById('bairro').value,
        regiao: document.getElementById('regiao').value,
        entrada: document.getElementById('entrada').value,
        latitude: parseFloat(document.getElementById('latitude').value),
        longitude: parseFloat(document.getElementById('longitude').value),
        // Campos de array e objeto precisarão ser manipulados separadamente
        // Exemplo para um campo de array simples (linha_metro):
        linha_metro: Array.from(document.querySelectorAll('input[name="linha_metro"]:checked')).map(el => el.value),
        acessibilidade: Array.from(document.querySelectorAll('input[name="acessibilidade"]:checked')).map(el => el.value),
        // Continue para outros campos
    };

    // Exemplo para coletar dados de um objeto como horarios_funcionamento
    dadosLugar.horarios_funcionamento = {
        "segunda-feira": {
            abertura: document.getElementById('segunda_abertura').value,
            fechamento: document.getElementById('segunda_fechamento').value
        },
        // Continue para os outros dias da semana
    };

    var token = localStorage.getItem('token');

    fetch('/api/lugares', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(dadosLugar)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Estabelecimento cadastrado com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao cadastrar estabelecimento:', error);
    });
});
