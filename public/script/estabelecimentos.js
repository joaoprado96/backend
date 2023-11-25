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

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/lugares')
        .then(response => response.json())
        .then(dados => {
            const container = document.getElementById('estabelecimentos');
            dados.forEach(estabelecimento => {
                container.innerHTML += criarCard(estabelecimento);
            });
        })
        .catch(erro => console.error('Erro ao carregar estabelecimentos:', erro));
});

function criarCard(estabelecimento) {
    return `
        <div class="col-md-3 mb-3">
            <div class="card h-100">
                <img src="./image/restaurante.jpg" class="card-img-top" alt="Imagem do Estabelecimento">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${estabelecimento.nome}</h5>
                    <p class="card-text">${truncateText(estabelecimento.descricao, 100)}</p>
                    <a href="detalhes.html?id=${estabelecimento._id}" class="btn btn-primary mt-auto" target="_blank">+ detalhes</a>
                </div>
            </div>
        </div>
    `;
}


function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

