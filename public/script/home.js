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

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletar valores dos campos do formulário
    const bairro = document.getElementById('bairro').value;
    const dia = document.getElementById('dia').value;
    const horario = document.getElementById('horario').value;
    const cartao = document.getElementById('cartao').value;
    const preco = document.getElementById('preco').value;
    const local = document.getElementById('local').value;
    const cozinha = document.getElementById('cozinha').value;

    // Construir a query string
    const queryParams = new URLSearchParams();
    if (bairro) queryParams.append('bairro', bairro);
    if (dia) queryParams.append('dia', dia);
    if (horario) queryParams.append('horario', horario);
    if (cartao) queryParams.append('cartao', cartao);
    if (preco) queryParams.append('preco', preco);
    if (local) queryParams.append('local', local);
    if (cozinha) queryParams.append('cozinha', cozinha);

    // Redirecionar para a página de estabelecimentos com os parâmetros da query string
    window.location.href = `estabelecimentos.html?${queryParams.toString()}`;
});
