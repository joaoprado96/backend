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
    const urlParams = new URLSearchParams(window.location.search);
    const estabelecimentoId = urlParams.get('id');
    
    if (estabelecimentoId) {
        fetch(`http://localhost:3000/api/lugares?_id=${estabelecimentoId}`)
            .then(response => response.json())
            .then(dados => {
                const detalhesContainer = document.getElementById('detalhe-estabelecimento');
                if (dados.length > 0) {
                    detalhesContainer.innerHTML = criarCardDetalhe(dados[0]);
                } else {
                    detalhesContainer.innerHTML = '<p>Estabelecimento não encontrado.</p>';
                }
            })
            .catch(erro => console.error('Erro ao carregar detalhes do estabelecimento:', erro));
    }
});

function criarCardDetalhe(estabelecimento) {
    return `
    <div class="container">
        <h1>${estabelecimento.nome}</h1>
        <p>${estabelecimento.descricao}</p>
        <h2>avalicação</h2>
        <div class="row">
            <div class="col-6">
                <p><strong>estrelas:</strong> ${estabelecimento.estrelas}</p>
            </div>
            <div class="col-6">
                <p><strong>clientes:</strong> ${estabelecimento.avaliacao_clientes}</p>
            </div>
        </div>

        <h2>localização</h2>
        <p><strong>endereço:</strong> ${estabelecimento.rua}, ${estabelecimento.bairro}, ${estabelecimento.cidade}, ${estabelecimento.cep} </p>
        <p><strong>bairro:</strong> ${estabelecimento.bairro} </p>
        <p><strong>cidade:</strong> ${estabelecimento.cidade} </p>
        
        <h2>contato</h2>

        <h2>fotos</h2>
    </div>
    `;
}

